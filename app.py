from flask import Flask, redirect, request, url_for, jsonify
from matplotlib.style import use
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json
from bson import json_util

import wfdb
import os
import zipfile

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
metadata = wfdb.get_dbs()

# replace w/ real mongodb url
mongoClient = MongoClient('mongodb+srv://mkhoje:MAMA101@cluster0.rpy4x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = mongoClient['projectMAMA']
usersCol = db['users'] # users collection
hwCol = db['hardware'] # hardware collection
projectsCol = db['projects'] # projects collections

CORS(app)

def customEncrypt(inputText, N, D):
    inputText = inputText[::-1]

    encryptedText = ""
    for c in inputText:
        if D == 1:
            encryptedText += chr((ord(c) - 34 + N) % 93 + 34)
        else:
            encryptedText += chr((ord(c) - 34 - N) % 93 + 34)

    return encryptedText

@app.route('/add-user', methods=["POST"])
def addUser():
    app.logger.info(request.json)
    fName = request.json['fName']
    lName = request.json['lName']
    username = request.json['username']
    password = request.json['password']
    password = customEncrypt(password, 5, 1)

    query = {'username': username}
    if usersCol.count_documents(query) == 1:
        return jsonify(0)
    else:
        # encrypt username and password
        usersCol.insert_one({
            'first_name': fName,
            'last_name': lName,
            'username': username,
            'password': password,
            'projects': []
        })

        return jsonify(1)

@app.route('/validate-account', methods=["POST"])
def validateUser():
    app.logger.info(request.json)
    username = request.json['username']
    password = request.json['password']
    password = customEncrypt(password, 5, 1)
    query = {
        'username':username,
        'password':password
    }

    hw = list(hwCol.find({}))
    hwSet1 = json.loads(json_util.dumps(hw[0]))
    app.logger.info(hwSet1['available'])
    hwSet2 = json.loads(json_util.dumps(hw[1]))

    if usersCol.count_documents(query) == 1:
        doc = usersCol.find_one({'username':username})

        return jsonify(1, username, doc['projects'],
         hwSet1['available'], hwSet2['available'],
         hwSet1['capacity'], hwSet2['capacity']
         )
    else:
        return jsonify(0)

@app.route('/add-project', methods=["POST"])
def addProject():
    app.logger.info(request.json)
    projName = request.json['projName']
    description = request.json['description']
    projId = request.json['projId']

    projectsCol.insert_one({
        'project_name': projName,
        'project_description': description,
        'project_id': projId,
        'hw1_checked_out': 0,
        'hw2_checked_out': 0
    })

    return ('', 204)

@app.route('/add-existing-project', methods=["POST"])
def addExistingProject():
    app.logger.info(request.json)
    username = request.json['username']
    projId = request.json['projId']

    query = {'username': username}
    doc = usersCol.find_one(query)
    project = projectsCol.find_one({'project_id': projId})
    jsonProject = json.loads(json_util.dumps(project))

    projects = doc['projects']
    projects.append(jsonProject)
    new_val = {'$set': {'projects': projects}}
    usersCol.update_one(query, new_val)

    return jsonify(projects)

@app.route('/get-HW1-checked-out', methods=["POST"])
def getHW1CheckedOut():
    app.logger.info(request.json)
    projId = request.json

    query = {'project_id': projId}
    doc = projectsCol.find_one(query)
    hw1CheckedOut = doc['hw1_checked_out']
    app.logger.info(hw1CheckedOut)

    return jsonify(hw1CheckedOut)

@app.route('/get-HW2-checked-out', methods=["POST"])
def getHW2CheckedOut():
    app.logger.info(request.json)
    projId = request.json

    query = {'project_id': projId}
    doc = projectsCol.find_one(query)
    hw1CheckedOut = doc['hw2_checked_out']
    app.logger.info(hw1CheckedOut)

    return jsonify(hw1CheckedOut)

@app.route('/update-hw-set', methods=["POST"])
def updateHWSet():
    app.logger.info(request.json)
    projId = request.json['projId']
    hwSet = request.json['HWSet']
    quantity = int(request.json['quantity'])
    checkType = request.json['checkType']

    query = {'project_id': projId}
    doc = projectsCol.find_one(query)

    hwSet = 'HWSet1' if (hwSet == 'HWSet1') else 'HWSet2'

    checked_out = -1
    if(hwSet == 'HWSet1'):
        checked_out = doc['hw1_checked_out']
    else:
        checked_out = doc['hw2_checked_out']

    hwDoc = hwCol.find_one({'name': hwSet})
    app.logger.info(hwDoc)
    available = hwDoc['available']

    if((checkType == "check in" and quantity > checked_out) or 
        (checkType == "check out" and quantity > available)):
        app.logger.info("ERROR")
        return jsonify(0)
    else:
        if(checkType == "check in"):
            available += quantity
            checked_out -= quantity
        else:
            available -= quantity
            checked_out += quantity

        hwCol.update_one({'name': hwSet}, {'$set': {'available': available}})
        if(hwSet == 'HWSet1'):
            projectsCol.update_one(query, {'$set': {'hw1_checked_out': checked_out}})
        else:
            projectsCol.update_one(query, {'$set': {'hw2_checked_out': checked_out}})

        return jsonify(1, hwSet, available, checked_out)

@app.route('/get-hw-availability', methods=["GET"])
def getHWAvailability():  
    hw1doc = hwCol.find_one({'name': 'HWSet1'})
    hw1Available = hw1doc['available']

    hw2doc = hwCol.find_one({'name': 'HWSet2'})
    hw2Available = hw2doc['available']

    return jsonify(hw1Available, hw2Available)

@app.route('/get-projects-info', methods=["POST"])
def getProjectsInfo():
    app.logger.info(request.json)
    username = request.json['username']

    hw = list(hwCol.find({}))
    hwSet1 = json.loads(json_util.dumps(hw[0]))
    app.logger.info(hwSet1['available'])
    hwSet2 = json.loads(json_util.dumps(hw[1]))

    doc = usersCol.find_one({'username':username})
    return jsonify(username, doc['projects'],
         hwSet1['available'], hwSet2['available'],
         hwSet1['capacity'], hwSet2['capacity']
    )

@app.route('/get-titles', methods=["GET"])
def getTitles():
    return jsonify(metadata[5][1], metadata[17][1], metadata[20][1], metadata[25][1], metadata[30][1])


if __name__ == '__main__':
    app.run(debug=True)
