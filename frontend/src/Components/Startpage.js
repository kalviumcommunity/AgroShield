import React from 'react'
import './Startpage.css'
import Image from '../assests/farmercartoon-removebg-preview.png'
import { CircularProgress } from '@chakra-ui/react';
// import Typewriter from 'typewriter-effect';


function Startpage() {


 

  return (
    <div className='container' >
      <div className='type' >
      Welcome to Agroshield
      </div>
      
      <div className='image' >
        <img src={Image} />
      </div>

      
      


      <div className='type2' >
      protect your Crop from insects
      </div>

      <CircularProgress isIndeterminate color='green.300' />


    </div>
  )
}

export default Startpage;