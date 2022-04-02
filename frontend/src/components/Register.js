import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import { useState } from 'react'
import NavbarComp from './NavbarComp'

export default function Register() {
    const  [fName, setFName] = useState('')
    const  [lName, setLName] = useState('')
    const  [username, setUsername] = useState('')
    const  [password, setPassword] = useState('')

    const history = useHistory();

    function addUser() {
        handleRegister({fName, lName, username, password})
    }

    function handleRegister(body){
        fetch('/add-user',{
            'method':'POST',
             headers : {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
        })

        history.push('/login')
    }

    function handleSubmit(event) {
        event.preventDefault()
        event.target.reset()
        addUser()
        setFName('')
        setLName('')
        setUsername('')
        setPassword('')
    }
 // handle if username already exists
  return (
            <div>
                <NavbarComp />
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                        name="fName"
                        placeholder="First Name"
                        onChange={(e)=>setFName(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <input
                        name="lName"
                        placeholder="Last Name"
                        onChange={(e)=>setLName(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <input
                        name="username"
                        placeholder="Username"
                        onChange={(e)=>setUsername(e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <input
                        name="password"
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)}
                        type="password"
                        >
                        </input>
                    </div>
                    <button>REGISTER</button>
                </form>
            </div>
        )
}
