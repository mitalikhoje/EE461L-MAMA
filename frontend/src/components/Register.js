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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Register() {
    const  [fName, setFName] = useState('')
    const  [lName, setLName] = useState('')
    const  [username, setUsername] = useState('')
    const  [password, setPassword] = useState('')
    const  [userExists, setUserExists] = useState('')

    const history = useHistory();

    function addUser() {
        handleRegister({fName, lName, username, password})
    }

    async function handleRegister(body){
        const response = await fetch('/add-user', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const json = await response.json()
        
        if(json) {
            history.push('/login')
        }
        else {
            setUserExists('Username already exists')
        }
        
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

  return (
            <div>
                <NavbarComp />
                <form style={{marginTop: '10%', marginLeft: '40%'}} onSubmit={handleSubmit}>
                    <h3>REGISTER</h3>
                    <div>
                        <TextField 
                        id="outlined-basic" 
                        label="First Name" 
                        variant="outlined" 
                        onChange={(e)=>setFName(e.target.value)}
                        style={{marginBottom: '10px'}}
                        />
                    </div>
                    <div>
                        <TextField 
                        id="outlined-basic" 
                        label="Last Name" 
                        variant="outlined" 
                        onChange={(e)=>setLName(e.target.value)}
                        style={{marginBottom: '10px'}}
                        />
                    </div>
                    <div>
                        <TextField 
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined" 
                        onChange={(e)=>setUsername(e.target.value)}
                        style={{marginBottom: '10px'}}
                        />
                    </div>
                    <div>
                        <TextField 
                        id="outlined-basic" 
                        label="Password" 
                        variant="outlined" 
                        onChange={(e)=>setPassword(e.target.value)}
                        style={{marginBottom: '10px'}}
                        />
                    </div>
                    <div>
                        <p style={{color: 'red'}}>{userExists}</p>
                    </div>
                    <Button type="submit" variant="contained" color="secondary">REGISTER</Button>
                </form>
            </div>
        )
}
