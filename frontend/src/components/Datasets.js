import React from 'react'
import NavbarComp2 from './NavbarComp2'
import { useLocation } from "react-router-dom";


export default function Datasets() {

  const location = useLocation()

  return (
    <div>
      <NavbarComp2 username={location.state} />
      
    </div>
  )
}
