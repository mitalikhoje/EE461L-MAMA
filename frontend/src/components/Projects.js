import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProjectModal from './ProjectModal';
import NavbarComp2 from './NavbarComp2';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Modal } from 'react-bootstrap'

export default function Projects(props) {
  
  const location = useLocation()
  const username = location.state[0]

  // add local storage for page refresh
  // should update projects on page refresh
  const  [projName, setProjName] = useState('')
  const  [description, setDescription] = useState('')
  const  [projId, setProjId] = useState('')
  const  [hw1CheckedOut, setHw1CheckedOut] = useState('')
  const  [hw2CheckedOut, setHw2CheckedOut] = useState('')
  const  [projects, setProjects] = useState(location.state[1])
  const  [HWSet1Avail, setHWSet1Avail] = useState(location.state[2])
  const  [HWSet2Avail, setHWSet2Avail] = useState(location.state[3])
  const  [HWSet1Cap, setHWSet1Cap] = useState(location.state[4])
  const  [HWSet2Cap, setHWSet2Cap] = useState(location.state[5])

  const [modalShow, setModalShow] = React.useState(false);

  function addProject() {
    handleNewProject({username, projName, description, projId})
  }

  function addExistProject() {
    handleExistProject({username, projId})
  }

  async function handleNewProject(body) {
    const response = await fetch('/add-project',{
      'method':'POST',
      headers : {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(body)
    })
  }

  async function handleExistProject(body) {
    const response = await fetch('/add-existing-project',{
      'method':'POST',
      headers : {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(body)
    })
    const json = await response.json();
    setProjects(json)
  }

  function handleNewSubmit(event) {
    event.preventDefault()
    event.target.reset()
    addProject()
    setProjName('')
    setDescription('')
    setProjId('')
  }

  function handleExistSubmit(event) {
    event.preventDefault()
    event.target.reset()
    addExistProject()
    setProjId('')
  }

  function getHW1CheckedOut(body) {
    handleHW1CheckedOut(body)
  }

  async function handleHW1CheckedOut(body) {
    const response = await fetch('/get-HW1-checked-out',{
      'method':'POST',
      headers : {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(body)
    })
    const json = await response.json();
    console.log(json)
    setHw1CheckedOut(json)
  }

  function getHW2CheckedOut(body) {
    handleHW2CheckedOut(body)
  }

  async function handleHW2CheckedOut(body) {
    const response = await fetch('/get-HW2-checked-out',{
      'method':'POST',
      headers : {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(body)
    })
    const json = await response.json();
    setHw2CheckedOut(json)
  }

  function getAvailability() {
    handleAvailability()
  }

  async function handleAvailability() {
    const response = await fetch('/get-hw-availability',{
      'method':'GET',
       headers : {
        'Content-Type':'application/json'
       }
    })
    const json = await response.json();
    setHWSet1Avail(json[0])
    setHWSet2Avail(json[1])
  }

  return (
    <div>
      <NavbarComp2 username={username}/>
      <Grid style={{marginTop: '10px', marginLeft: '10px'}} container spacing={2}>
        <Grid item xs={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              title="Create New Project"
            />
            <CardContent>
              <form onSubmit={handleNewSubmit}>
                <TextField 
                  id="outlined-basic" 
                  label="Name" 
                  variant="outlined" 
                  onChange={(e)=>setProjName(e.target.value)}
                  style={{marginBottom: '10px'}}
                />
                <TextField 
                  id="outlined-basic" 
                  label="ID" 
                  variant="outlined" 
                  onChange={(e)=>setProjId(e.target.value)}
                  style={{marginBottom: '10px'}}
                />
                <TextField 
                  id="outlined-basic" 
                  label="Description" 
                  variant="outlined" 
                  onChange={(e)=>setDescription(e.target.value)}
                  style={{marginBottom: '10px'}}
                />
                <div><Button type="submit" variant="contained" color="secondary">+</Button></div>
              </form>
            </CardContent>
          </Card>
          <Card style={{marginTop: '15px'}} sx={{ maxWidth: 345 }}>
            <CardHeader
              title="Add Existing Project"
            />
            <CardContent>
              <form onSubmit={handleExistSubmit}>
                <TextField 
                  id="outlined-basic" 
                  label="ID" 
                  variant="outlined" 
                  onChange={(e)=>setProjId(e.target.value)}
                  style={{marginBottom: '10px'}}
                />
                <div><Button type="submit" variant="contained" color="secondary">+</Button></div>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={9}>
        <h2>Projects</h2>
          <TableContainer component={Paper}>
            <Table sx={{ width: 600, maxWidth: '100%' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Resources</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project) => (
                  <TableRow
                    key={project['project_name']}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                      <TableCell component="th" scope="row">
                        {project['project_name']}
                      </TableCell>
                      <TableCell>{project['project_id']}</TableCell>
                      <TableCell>{project['project_description']}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="secondary" onClick={() => 
                          { setModalShow(true); setProjName(project['project_name']); setProjId(project['project_id']);
                            getHW1CheckedOut(project['project_id']); getHW2CheckedOut(project['project_id']);}}
                          >OPEN</Button>
                        <ProjectModal
                          show={modalShow}
                          onHide={() => {setModalShow(false); getAvailability();}} // update hw set info
                          projName={projName}
                          projId={projId}
                          hw1CheckedOut={hw1CheckedOut}
                          hw2CheckedOut={hw2CheckedOut}
                          HWSet1Avail={HWSet1Avail}
                          HWSet2Avail={HWSet2Avail}
                        /> 
                      </TableCell>
                  </TableRow>
                ))}
               </TableBody>
            </Table>
          </TableContainer>

          <h2 style={{marginTop: '10px'}}>Hardware Sets</h2>
          <TableContainer component={Paper}>
            <Table sx={{ width: 600, maxWidth: '100%' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Available</TableCell>
                  <TableCell>Capacity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                    key='HwSet1'
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                      <TableCell component="th" scope="row">HWSet1</TableCell>
                      <TableCell>{HWSet1Avail}</TableCell>
                      <TableCell>{HWSet1Cap}</TableCell>
                  </TableRow>
                  <TableRow
                    key='HwSet2'
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                      <TableCell component="th" scope="row">HWSet2</TableCell>
                      <TableCell>{HWSet2Avail}</TableCell>
                      <TableCell>{HWSet2Cap}</TableCell>
                </TableRow>
               </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}
