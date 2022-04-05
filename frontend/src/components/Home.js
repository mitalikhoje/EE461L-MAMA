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
          alignItems:'center', paddingLeft:'35%', paddingRight:'35%', marginBottom: '10px'}}>
          <h6>
            A new and improved Hardware as a Service site that helps new and exisiting
            users create new or join existing users create new or join existing projects,
            check out hardware sets within any projects andd view datasets.
          </h6>
         </div>
        <div style={{display: 'flex',  justifyContent:'center',
         alignItems:'center'}}>
          <Button style={{marginRight: '10px'}} onClick={navigateLogIn} variant="contained" color="secondary">LOGIN</Button>
          <Button onClick={navigateRegister} variant="contained" color="secondary">REGISTER</Button>
        </div>
      </div>
  )
}
