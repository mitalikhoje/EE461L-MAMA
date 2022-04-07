import React, { useEffect } from 'react'
import NavbarComp2 from './NavbarComp2';
import { useLocation } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Datasets() {

  const location = useLocation()
  const username = location.state[1]
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
                  {/* https://physionet.org/content/adfecgdb/1.0.0/ */}
                  <TableCell>Abdominal and Direct Fetal ECG Database</TableCell>
                  <TableCell>Olaf Dössel et al. </TableCell>
                  <TableCell>The research material included in the Abdominal and Direct Fetal Electrocardiogram Database contains multichannel fetal electrocardiogram (FECG) recordings obtained from 5 different women in labor, between 38 and 41 weeks of gestation. The recordings were acquired in the Department of Obstetrics at the Medical University of Silesia, by means of the KOMPOREL system for acquisition and analysis of fetal electrocardiogram (ITAM Institute, Zabrze, Poland). Each recording comprises four differential signals acquired from maternal abdomen and the reference direct fetal electrocardiogram registered from the fetal head.</TableCell>
                  <TableCell>14.6 MB</TableCell>
                  <TableCell><a href="https://www.physionet.org/static/published-projects/adfecgdb/abdominal-and-direct-fetal-ecg-database-1.0.0.zip">ADFECGDB.zip</a></TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  {/* https://physionet.org/content/multi-gait-posture/1.0.0/ */}
                  <TableCell>A multi-camera and multimodal dataset for posture and gait analysis</TableCell>
                  <TableCell>Manuel Palermo et al. </TableCell>
                  <TableCell>Gait and posture analysis while using assisting robotic devices is of utmost importance to attain effective assistance. This work provides a multi-camera, multimodal, and detailed dataset for vision-based applications using a wheeled robotic walker equipped with a pair of affordable cameras. Depth data was acquired at 30 fps from a total of 14 healthy participants walking at 3 different gait speeds, across 3 different walking scenarios/paths at 3 different locations. Simultaneously, accurate skeleton joint data was recorded using an inertial-based commercial motion capture system that provides a reliable ground-truth for classical or novel (i.e., machine learning-based) vision-based applications. In total, the database contains approximately 166K frames of synchronized data, which amounts to 92 minutes of total recording time. This dataset may contribute to the development and evaluation of: i) classic or data-driven vision-based pose estimation algorithms; ii) applications in human detection and tracking, and movement forecasting; iii) and gait/posture metrics analysis using a rehabilitation device.</TableCell>
                  <TableCell>19.4 GB</TableCell>
                  <TableCell><a href="https://www.physionet.org/static/published-projects/multi-gait-posture/a-multi-camera-and-multimodal-dataset-for-posture-and-gait-analysis-1.0.0.zip">MGP.zip</a></TableCell>
                  </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  {/* https://physionet.org/content/sleep-accel/1.0.0/ */}
                  <TableCell>Motion and heart rate from a wrist-worn wearable and labeled sleep from polysomnography</TableCell>
                  <TableCell>Olivia Watch et al. </TableCell>
                  <TableCell>This project contains acceleration (in units of g) and heart rate (bpm, measured from photoplethysmography) recorded from the Apple Watch, as well as labeled sleep scored from gold-standard polysomnography. Data were collected at the University of Michigan from June 2017 to March 2019, and there are 31 subjects in total. Code to read and process these files is available on GitHub. The paper corresponding to the work is Walch et al., "Sleep stage prediction with raw acceleration and photoplethysmography heart rate data derived from a consumer wearable device", SLEEP (2019).</TableCell>
                  <TableCell>550.1  MB</TableCell>
                  <TableCell><a href="https://www.physionet.org/static/published-projects/sleep-accel/motion-and-heart-rate-from-a-wrist-worn-wearable-and-labeled-sleep-from-polysomnography-1.0.0.zip">SLEEP.zip</a></TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  {/* https://physionet.org/content/mmash/1.0.0/ */}
                  <TableCell>Multilevel Monitoring of Activity and Sleep in Healthy People</TableCell>
                  <TableCell>Alessio Rossi et al. </TableCell>
                  <TableCell>Multilevel Monitoring of Activity and Sleep in Healthy people (MMASH) dataset provides 24 hours of continuous beat-to-beat heart data, triaxial accelerometer data, sleep quality, physical activity and psychological characteristics (i.e., anxiety status, stress events and emotions) for 22 healthy participants. Moreover, saliva bio-markers (i.e.cortisol and melatonin) and activity log were also provided in this dataset. The MMASH dataset will enable researchers to test the correlations between physical activity, sleep quality, and psychological characteristics.</TableCell>
                  <TableCell>22.7 MB</TableCell>
                  <TableCell><a href="https://www.physionet.org/static/published-projects/mmash/multilevel-monitoring-of-activity-and-sleep-in-healthy-people-1.0.0.zip">MMASH.zip</a></TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  {/* https://physionet.org/content/simultaneous-measurements/1.0.0/ */}
                  <TableCell>Simultaneous physiological measurements with five devices at different cognitive and physical loads</TableCell>
                  <TableCell>Marcus Vollmer et al. </TableCell>
                  <TableCell>This open database contains physiological measurements from 13 adult and healthy subjects during a standardized experimental setup. The physiology was examined with five different devices (NeXus-10 MKII, eMotion Faros 360°, SOMNOtouch NIBP, Hexoskin Hx1, Polar RS800 Multi), which, in contrast to other studies, were recorded simultaneously. The experiment included a five minute baseline measurement, five minute walking on the treadmill, a five minute cognitive audio test, and a five minute uphill walking on the treadmill. Measurements included electrocardiography (ECG), photoplethysmography, accelerometry, oxygen saturation, respiration, heart rate, heart rate variability, and RR intervals sampled between 1 Hz and 8000 Hz. The dataset was originally generated during an investigation of functionality, accuracy, and usability of several ECG-measurement devices. This resource included the complete raw data files (EDF and HRM) and merged data with a manual expert annotation of heart beats and annotation files with information about the beginning of each experimental phase.</TableCell>
                  <TableCell>777.0 MB</TableCell>
                  <TableCell><a href="https://www.physionet.org/static/published-projects/simultaneous-measurements/simultaneous-physiological-measurements-with-five-devices-at-different-cognitive-and-physical-loads-1.0.0.zip">SIMMEASURE.zip</a></TableCell>
                </TableRow>
              </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
