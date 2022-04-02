import React from 'react'
import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';


export default function ProjectModal(props) {
    console.log(props)

    const projId = props.projId
    
    const  [HWSet, setHWSet] = useState('')
    const  [quantity, setQuantity] = useState(0)
    const  [checkType, setCheckType] = useState('')
    
    const  [hw1CheckedOut, setHw1CheckedOut] = useState(props.hw1CheckedOut)
    useEffect(() => {
      console.log("useEffect1 called");
      setHw1CheckedOut(props.hw1CheckedOut);
 
    }, [props.hw1CheckedOut]);

    const  [hw2CheckedOut, setHw2CheckedOut] = useState(props.hw2CheckedOut)
    useEffect(() => {
      console.log("useEffect2 called");
      setHw2CheckedOut(props.hw2CheckedOut);
 
    }, [props.hw2CheckedOut]);

    const  [HWSet1Avail, setHWSet1Avail] = useState(props.HWSet1Avail)
    const  [HWSet2Avail, setHWSet2Avail] = useState(props.HWSet2Avail)

    console.log(checkType)

    function updateHWSet() {
      handleHWUpdate({projId, HWSet, quantity, checkType})
    }

    async function handleHWUpdate(body) {
      const response = await fetch('/update-hw-set',{
        'method':'POST',
        headers : {
        'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
      })
      const json = await response.json();
      // error handle
      if(json[0] == 'HWSet1'){
        setHWSet1Avail(json[1])
        setHw1CheckedOut(json[2])
      }
      else{
        setHWSet2Avail(json[1])
        setHw2CheckedOut(json[2])
      }
    }

    function handleSubmit(event) {
      event.preventDefault()
      event.target.reset()
      updateHWSet()
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.projName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <TableContainer component={Paper}>
                <Table sx={{ width: 600, maxWidth: '100%' }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>HW Set</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Check In</TableCell>
                      <TableCell>Check Out</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Set #</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={(e)=>setHWSet(e.target.value)}
                                    >
                                    <MenuItem value={''}><i>None</i></MenuItem>
                                    <MenuItem value={'HWSet1'}>HWSet1</MenuItem>
                                    <MenuItem value={'HWSet2'}>HWSet2</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>                    
                        </TableCell>
                        <TableCell>
                            <TextField label="Quantity" variant="standard" color="secondary" onChange={(e)=>setQuantity(e.target.value)} focused />
                        </TableCell>
                        <TableCell>
                            <Button type="submit" variant="outlined" color="secondary" onClick={() => setCheckType('check in')} >CHECK IN</Button>
                        </TableCell>
                        <TableCell>
                          <Button type="submit" variant="outlined" color="secondary" onClick={() => setCheckType('check out')} >CHECK OUT</Button>
                        </TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
            </TableContainer>
          </form>
          <TableContainer component={Paper}>
                <Table sx={{ width: 600, maxWidth: '100%' }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>HW Set Name</TableCell>
                      <TableCell>Available</TableCell>
                      <TableCell>Checked Out</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">HWSet1</TableCell>
                        <TableCell>{HWSet1Avail}</TableCell>
                        <TableCell>{hw1CheckedOut}</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">HWSet2</TableCell>
                        <TableCell>{HWSet2Avail}</TableCell>
                        <TableCell>{hw2CheckedOut}</TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
          </TableContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}
