import React from 'react'
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import { useState } from 'react'
import NavbarComp from './NavbarComp';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Login(props) {
    const  [username, setUsername] = useState('')
    const  [password, setPassword] = useState('')
    const  [errorMsg, setErrorMsg] = useState('')
    const [res, setRes] = useState({})

    const history = useHistory();

    function validateAccount() {
        setRes(handleLogin({username, password}, username))
    }

    function handleSubmit(event) {
        event.preventDefault()
        event.target.reset()
        validateAccount()
        setUsername('')
        setPassword('')
    }

    async function handleLogin(body){
        const response = await fetch('/validate-account', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const json = await response.json()
        const info = [json[1], json[2], json[3], json[4], json[5], json[6]]

        if(json[0]) {
            history.push({
                pathname: '/projects',
                state: info
            })
        }
        else {
            setErrorMsg("Incorrect username or password")
        }
        
    }

    return (
        <div>
            <NavbarComp />
            <form style={{marginTop: '10%', marginLeft: '40%'}} onSubmit={handleSubmit} >
                <h3>LOGIN</h3>
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
                    />
                </div>
                <div>
                    <p style={{color: 'red'}}>{errorMsg}</p>
                </div>
                <Button style={{marginBottom: '5px'}} type="submit" variant="contained" color="secondary">LOGIN</Button>
                <div><Link style={{color: 'grey'}} to="/register">Don't have an account?</Link></div>
            </form>
        </div>
    )
}
