import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import NavbarComp from './NavbarComp';
import Button from '@mui/material/Button';

export default function Home() {
    const history = useHistory();
    const navigateLogIn = () => history.push('/login')
    const navigateRegister = () => history.push('/register')

  return (
      <div>
        <NavbarComp />
        <h1 style={{display: 'flex',  justifyContent:'center',
         alignItems:'center', height: '10vh'}}>Project MAMA</h1>
        <div style={{display: 'flex',  justifyContent:'center',
         alignItems:'center'}}>
          <Button style={{marginRight: '10px'}} onClick={navigateLogIn} variant="contained" color="secondary">LOGIN</Button>
          <Button onClick={navigateRegister} variant="contained" color="secondary">REGISTER</Button>
        </div>
      </div>
  )
}
