import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";

export default function NavbarComp2(props) {
    console.log(props.username)
    const username = props.username

    const history = useHistory();

    function loadProjectsPage() {
        handleProjectsPage({username})
    }

    async function handleProjectsPage(body){
        const response = await fetch('/get-projects-info', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const json = await response.json();
        const info = [json[0], json[1], json[2], json[3], json[4], json[5]]

        history.push({
            pathname: '/projects',
            state: info
        })
    }

    function loadDatasetsPage(){
        console.log(username)
        history.push({
            pathname: '/datasets',
            state: username
        })
    }

    return (
        <div>
            <Navbar bg="dark" variant={"dark"} expand="lg">
                <Navbar.Brand href="">MAMA</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={loadProjectsPage}>Projects</Nav.Link>
                        <Nav.Link onClick={loadDatasetsPage}>Datasets</Nav.Link>
                        <Nav.Link as={Link} to="/">Sign Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
