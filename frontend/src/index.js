import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Login from './components/Login';
import Projects from './components/Projects';
import Register from './components/Register';
import Datasets from './components/Datasets';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Routers = () => {
  return (
    // routes paths to components
    <Router>
     <div>
      <Route exact path="/">
         <Home />
       </Route>
       <Route path="/register">
         <Register />
       </Route>
       <Route path="/login">
         <Login />
       </Route>
       <Route path="/projects">
         <Projects />
       </Route>
       <Route path="/datasets">
         <Datasets />
       </Route>
     </div>
   </Router>
  )
}

render(<Routers />, document.getElementById('root'));