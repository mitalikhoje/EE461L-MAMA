import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function NavbarComp2(props) {
    return (
        <div>
            <Navbar bg="dark" variant={"dark"} expand="lg">
                <Navbar.Brand href="">{props.name} Projects</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
                        <Nav.Link as={Link} to="/datasets">Datasets</Nav.Link>
                        <Nav.Link as={Link} to="/">Sign Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
