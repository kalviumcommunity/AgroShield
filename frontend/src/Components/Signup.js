


import { Flex, Input,Box,Heading,FormControl,FormLabel,Button } from '@chakra-ui/react'
import Navbar from './Navbar'
import React from 'react'
import { useState } from 'react'

function Signup () {

  const [email, setemail] = useState('');
  const [password,setpassword] = useState('');

  const SIGNUP=process.env.REACT_APP_SIGNUP

  const checkfield=(e)=>{
    e.preventDefault();
    if( email!=="" && password!=="" ){
    fetch(SIGNUP, {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
      "email":email,
      "password":password,
  }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
 
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(json =>{
    if(json.user){
        alert("login successfully")
        window.location.href='/'
    }
    else{
        alert("Please check your email and password")
    }
});
    
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
            


            


        

           


            <FormControl mb={'10'} >
              <FormLabel fontSize={'20px'} >Email</FormLabel>
              <Input onChange={(e)=>setemail(e.target.value)} h={'16'} size={'lg'} type={'email'}  placeholder="Enter Email..." value={email} />
            </FormControl>


            <FormControl mb={'10'} >
              <FormLabel fontSize={'20px'} >Password</FormLabel>
              <Input onChange={(e)=>setpassword(e.target.value)} h={'16'} size={'lg'} type={'password'}  placeholder="Enter password..." value={password} />
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

export default Signup;