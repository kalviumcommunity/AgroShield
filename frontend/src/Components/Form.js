import { Flex, Input,Box,Heading,FormControl,FormLabel,Button,  LightMode } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Form() {

  const [Crop, setcrop] = useState('');
  const [medicine,setmedicine] = useState('');
  const [type,settype] = useState('');
  const [diseasename,setdisease] = useState('');
  const [image,setimage] = useState('');

  const navigate = useNavigate();

   const USERINPUT = process.env.REACT_APP_SECRET_KEY + '/userinput'
    const Token = sessionStorage.getItem("token")
    const name=sessionStorage.getItem('username')

  const checkfield=(e)=>{
    e.preventDefault()
    if(Crop!=="" && medicine!=="" && type!=="" && name!=="" &&  image!=="" && diseasename!==""){
    fetch(USERINPUT, {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
      "cropName":Crop,
      "Disease":diseasename,
      "solution":medicine,
      "UserName":name,
      "type":type,
      "image":image,
  }),
     
    // Adding headers to the request
    headers: {
      'Authorization': 'Bearer ' + Token,
        "Content-type": "application/json; charset=UTF-8"
    }
})
 
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(json =>{ 
  console.log(json)
  navigate('/home')
});
    
    }
    
  }



  


  return (
    <div >




<Flex mt={'10rem'}  color={'black'} fontSize={'15px'} width="full" align="center" justifyContent="center">
      <Box mb={'5rem'} boxShadow='dark-lg' p='6' rounded='md' bg='white' borderRadius={'2rem'} w={'35rem'}  fontSize={'15px'} >
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

           
            <FormControl  mb={'10'} >
              <FormLabel color={'black'} bg={'white'} fontSize={'20px'}  >Type of Medicine</FormLabel>
              <select color='black' backgroundcolor="white" onChange={(e)=>settype(e.target.value)} >
                <LightMode>
                <option  value="">Select the type</option>
            <option value="insecticide">Insecticide</option>
            <option value="herbicide">Herbicide</option>
            <option value="fungicide">Fungicide</option>
            <option value="biofungicide">Bio-Fungicide</option>
            <option value="bioinsecticide">Bio-Insecticide</option>
            </LightMode>
              </select>
            </FormControl>
           
           


            <FormControl mb={'10'} >
              <FormLabel fontSize={'20px'} >Disease Name</FormLabel>
              <Input onChange={(e)=>setdisease(e.target.value)} h={'16'} size={'lg'} type={'text'}  placeholder="Type Disease Name..." />
            </FormControl>


            <FormControl mb={'10'} >
              <FormLabel fontSize={'20px'} >Disease Image</FormLabel>
              <Input onChange={(e)=>setimage(e.target.value)} h={'16'} size={'lg'} type={'text'}  placeholder="Paste the image link here..." />
            </FormControl>


         


            <Button h={'16'} fontSize={'20px'} width="full" mt={4} type="submit" onClick={(e)=>checkfield(e)} >
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