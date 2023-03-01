


import { Flex, Input,Box,Heading,FormControl,FormLabel,Button } from '@chakra-ui/react'
import Navbar from './Navbar'
import Footer from './Footer'
import React from 'react'
import { useState } from 'react'

function Form() {

  const [Crop, setcrop] = useState('');
  const [medicine,setmedicine] = useState('');
  const [type,settype] = useState('');
  const [diseasename,setdisease] = useState('');
  const [username,setname] = useState('');


  const checkfield=(e)=>{
    e.preventDefault();
    if(Crop!="" && medicine!="" && type!="" && username!="" && diseasename!=""){
    // console.log("cropname",Crop);
    // console.log("Medicine Name",medicine);
    // console.log("Type",type);
    // console.log("dosease",diseasename);
    // console.log("Username",username);
    fetch("http://localhost:2000/userinput", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
      "cropName":Crop,
      "diseaseName":diseasename,
      "solution":medicine,
      "UserName":username,
      "type":type,
  }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
 
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(json => console.log(json));
    window.location.href="/";
    }
    
  }

  


  return (
    <div >

<Navbar/>
<Flex fontSize={'15px'} width="full" align="center" justifyContent="center">
      <Box fontSize={'15px'} p={2}>
        <Box  textAlign="center">
          <Heading mb={'10'} fontSize={'30px'} >Information Form</Heading>
        </Box>
        <Box  my={4} textAlign="left">
          <form onSubmit={(e)=>checkfield(e)} >
            <FormControl  mb={'10'} >
              <FormLabel fontSize={'20px'} >Crop Name</FormLabel>
              <Input onChange={(e)=>setcrop(e.target.value)} size={'lg'} h={'16'} placeholder="Enter Crop Name..." />
            </FormControl>


            


            <FormControl mb={'10'} >
              <FormLabel fontSize={'20px'} >Medicine Name</FormLabel>
              <Input onChange={(e)=>setmedicine(e.target.value)} h={'16'} type={'text'} size={'lg'}  placeholder="Type Medicine name..." />
            </FormControl>

            <FormControl mb={'10'} >
              <FormLabel fontSize={'20px'}  >Type of Medicine</FormLabel>
              <select onChange={(e)=>settype(e.target.value)} >
            <option value="Pesticide">Pesticide</option>
            <option value="Herbicide">Herbicide</option>
            <option value="Fungicide">Fungicide</option>
            <option value="Bio-Fungicide">Bio-Fungicide</option>
            <option value="Bio-insecticide">Bio-insecticide</option>
              </select>
            </FormControl>

           


            <FormControl mb={'10'} >
              <FormLabel fontSize={'20px'} >Disease Name</FormLabel>
              <Input onChange={(e)=>setdisease(e.target.value)} h={'16'} size={'lg'} type={'text'}  placeholder="Type Disease Name..." />
            </FormControl>


            <FormControl mb={'10'} >
              <FormLabel fontSize={'20px'} >Your Name</FormLabel>
              <Input onChange={(e)=>setname(e.target.value)} h={'16'} type={'text'} size={'lg'}  placeholder="Type your name..." />
            </FormControl>


            <Button h={'16'} fontSize={'20px'} width="full" mt={4} type="submit" onClick={()=>checkfield()} >
              submit
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>


       {/* <Footer/> */}
    </div>
  )
}

export default Form