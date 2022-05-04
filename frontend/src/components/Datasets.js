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

export default function Datasets() {

  const location = useLocation()
  const username = location.state[1]
  const  [titleOne, setTitleOne] = useState('')
  const  [titleTwo, setTitleTwo] = useState('')
  const  [titleThree, setTitleThree] = useState('')
  const  [titleFour, setTitleFour] = useState('')
  const  [titleFive, setTitleFive] = useState('')


  async function handleTitles() {
    const response = await fetch('/get-titles',{
      'method':'GET',
       headers : {
        'Content-Type':'application/json'
       }
    })
    const json = await response.json();
    setTitleOne(json[0])
    setTitleTwo(json[1])
    setTitleThree(json[2])
    setTitleFour(json[3])
    setTitleFive(json[4])
  }

  handleTitles();

  return (
    <div>
      <NavbarComp2 username={location.state} />
      <h2>Datasets</h2>
      <TableContainer component={Paper}>
      <Table sx={{ maxWidth: '100%' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dataset Title</TableCell>
                  <TableCell>Authors</TableCell>
                  <TableCell>Description of Dataset</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Download Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {/* https://physionet.org/content/aftdb/1.0.0/ */}
                  <TableCell>{titleOne}</TableCell>
                  <TableCell>George Moody </TableCell>
                  <TableCell>This database of two-channel ECG recordings has been created for use in the Computers in Cardiology Challenge 2004, an open competition with the goal of developing automated methods for predicting spontaneous termination of atrial fibrillation (AF). See the challenge announcement for information about the competition. </TableCell>
                  <TableCell>2.4 MB</TableCell>
                  <TableCell><a href="https://www.physionet.org/static/published-projects/aftdb/af-termination-challenge-database-1.0.0.zip">aftdb.zip</a></TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  {/* https://physionet.org/content/but-pdb/1.0.0/ */}
                  <TableCell>{titleTwo}</TableCell>
                  <TableCell>Lucie Marsanova et al. </TableCell>
                  <TableCell>Brno University of Technology ECG Signal Database with Annotations of P Wave (BUT PDB) is an ECG signal database with marked peaks of P waves created by the cardiology team at the Department of Biomedical Engineering, Brno University of Technology. The database consists of 50 2-minute 2-lead ECG signal records with various types of pathology. The ECGs were selected from three existing databases of ECG signal - the MIT-BIH Arrhythmia Database, the MIT-BIH Supraventricular Arrhythmia Database, and the Long Term AF Database. The P waves positions were manually annotated by two ECG experts in all 50 records. Each record contains also annotation of positions and types of QRS complexes (from original database) and dominant diagnosis (pathology) present in record. This database is created for the development, evaluation and objective comparison of P wave detection algorithms.</TableCell>
                  <TableCell>4.9 MB</TableCell>
                  <TableCell><a href="https://www.physionet.org/static/published-projects/but-pdb/brno-university-of-technology-ecg-signal-database-with-annotations-of-p-wave-but-pdb-1.0.0.zip">but-pdb.zip</a></TableCell> 
                  </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  {/* https://www.physionet.org/content/calcium-imaging-sleep-state/1.0.1/ */}
                  <TableCell>{titleThree}</TableCell>
                  <TableCell>Eric Landsness et al. </TableCell>
                  <TableCell>A collection of wide-field calcium imaging (WFCI) sleep and wake recordings collected from twelve transgenic mice expressing GCaMP6f in excitatory neurons. Each mouse underwent a three-hour undisturbed WFCI recording session where wake, REM (rapid eye movement) sleep and NREM (non-REM) sleep was recorded. Each WFCI recording is manually scored by sleep scoring experts in 10-second epochs as wake, NREM or REM by use of adjunct EEG/EMG. The dataset contains annotated WFCI recordings, brain mask and the Paxinos atlas used for defining the brain regions. The dataset was collected as part of a study evaluating a deep learning-based automated sleep state classification method.</TableCell>
                  <TableCell>550.1  MB</TableCell>
                  <TableCell><a href="https://www.physionet.org/static/published-projects/sleep-accel/motion-and-heart-rate-from-a-wrist-worn-wearable-and-labeled-sleep-from-polysomnography-1.0.0.zip">ciss.zip</a></TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  {/* https://www.physionet.org/content/cded/1.0.0/ */}
                  <TableCell>{titleFour}</TableCell>
                  <TableCell>Vera Novak et al. </TableCell>
                  <TableCell>This dataset was collected as part of a prospective observational study to evaluate the effects of type 2 diabetes mellitus (DM) on cerebral vasoregulation, perfusion and functional outcomes, measured by blood flow responses to hypocapnia and hypercapnia, Valsalva maneuver, head-up tilt, and sit-to-stand test. The dataset comprises of observations from 69 diabetic and control participants (aged 55 to 75 years) with continuous measurements of cerebral blood flow using transcranial Doppler and MRI (magnetic resonance imaging), heart rate, blood pressure, and respiratory parameters, balance, walking, laboratory and retinopathy measures at baseline, and 41 subjects who completed the two-years of follow-up. Regional gray, white matter and cerebrospinal fluid volumes were quantified using a segmentation method applied on T1- and T2- weighted images and perfusion maps, using a continuous arterial spin labeling (CASL) images at 3 Tesla MRI. White matter integrity was determined from fluid attenuated inversion recovery (FLAIR) and diffusion tensor imaging (DTI) MRI. Dynamics of cerebral vasoregulation to CO2 challenge and orthostatic stress were measured using Transcranial Doppler ultrasound (TCD).</TableCell>
                  <TableCell>2.1 GB</TableCell>
                  <TableCell><a href="https://www.physionet.org/static/published-projects/cded/cerebromicrovascular-disease-in-elderly-with-diabetes-1.0.0.zip">cded.zip</a></TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  {/* https://physionet.org/content/chbmit/1.0.0/ */}
                  <TableCell>{titleFive}</TableCell>
                  <TableCell>Shoeb, Ali Hossam et al. </TableCell>
                  <TableCell>This database, collected at the Children's Hospital Boston, consists of EEG recordings from pediatric subjects with intractable seizures. Subjects were monitored for up to several days following withdrawal of anti-seizure medication in order to characterize their seizures and assess their candidacy for surgical intervention.</TableCell>
                  <TableCell>777.0 MB</TableCell>
                  <TableCell><a href="https://www.physionet.org/static/published-projects/simultaneous-measurements/simultaneous-physiological-measurements-with-five-devices-at-different-cognitive-and-physical-loads-1.0.0.zip">chbmit.zip</a></TableCell>
                </TableRow>
              </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
