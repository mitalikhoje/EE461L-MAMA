
from flask import Flask, redirect, request, url_for, jsonify
from matplotlib.style import use
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import json
from bson import json_util

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# replace w/ real mongodb url
mongoClient = MongoClient('mongodb+srv://mkhoje:MAMA101@cluster0.rpy4x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
db = mongoClient['projectMAMA']
usersCol = db['users'] # users collection
hwCol = db['hardware'] # hardware collection
projectsCol = db['projects'] # projects collections

CORS(app)

@app.route('/add-user', methods=["POST"])
def addUser():
    app.logger.info(request.json)
    fName = request.json['fName']
    lName = request.json['lName']
    username = request.json['username']
    password = request.json['password']
    # encrypt username and password
    usersCol.insert_one({
        'first_name': fName,
        'last_name': lName,
        'username': username,
        'password': password,
        'projects': []
    })

@app.route('/validate-account', methods=["POST"])
def validateUser():
    app.logger.info(request.json)
    username = request.json['username']
    password = request.json['password']
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
    username = request.json['username']
    projName = request.json['projName']
    description = request.json['description']
    projId = request.json['projId']

    query = {'username': username}
    doc = usersCol.find_one(query)
    projects = doc['projects']
    project = {
        'project_name': projName,
        'project_description': description,
        'project_id': projId
    }
    projects.append(project)
    new_val = {'$set': {'projects': projects}}

    usersCol.update_one(query, new_val)

    projectsCol.insert_one({
        'project_name': projName,
        'project_description': description,
        'project_id': projId,
        'hw1_checked_out': 0,
        'hw2_checked_out': 0
    })

    return jsonify(projects)

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
        return 0
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

        return jsonify(hwSet, available, checked_out)



if __name__ == '__main__':
    app.run(debug=True)