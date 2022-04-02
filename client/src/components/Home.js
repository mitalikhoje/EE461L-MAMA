import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import NavbarComp from './NavbarComp';

export default function Home() {
    const history = useHistory();
    const navigateLogIn = () => history.push('/login')
    const navigateRegister = () => history.push('/register')

  return (
      <div>
        <NavbarComp />
        <h1>Project MAMA</h1>
        <button onClick={navigateLogIn}>LOGIN</button>
        <button onClick={navigateRegister}>REGISTER</button>
      </div>
  )
}
