import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';


function Home(props) {


  // const value=document.querySelector(".inputbox").value;
  // console.log(value);

  

  const [apidata, setdata] = useState([])

  // console.log(props.anmol);

  fetch("http://localhost:2000/userinput").then(res => res.json())
      .then((data)=>{
        // console.log(data); 
        setdata(data);
        

      }).catch((err)=>{
        console.log(err);
      })


      // console.log(apidata)

      

  return (
    <div>
      <Navbar/>

       {/* <div className='data' ></div> */}

       <SimpleGrid p="15px" spacing={10} minChildWidth="250px" >
        {
          apidata.map((dat)=>{
            return (
            <Box boxShadow='outline'  rounded='md'  fontSize={'15px'} textAlign={'left'} color={'black'} bg='white' h="200px" border="1px solid" >
          <Flex justifyContent={'space-around'}>
          <Box mt={'2vh'} >
            Cropname:
          </Box>
          <Box display={'flex'}  mt={'2vh'}  >
            {dat.cropName}
          </Box>
          </Flex>


          <Flex justifyContent={'space-around'}>
          <Box  >
            Disease:
          </Box>
          <Box display={'flex'}   >
            {dat.diseaseName}
          </Box>
          </Flex>



          <Flex justifyContent={'space-around'}>
          <Box  >
            Solution:
          </Box>
          <Box display={'flex'}  >
            {dat.solution}
          </Box>
          </Flex>



          <Flex justifyContent={'space-around'}>
          <Box   >
            Type:
          </Box>
          <Box display={'flex'}   >
            {dat.type}
          </Box>
          </Flex>


          <Flex justifyContent={'space-around'}>
          <Box   >
            Username:
          </Box>
          <Box display={'flex'}    >
            {dat.UserName}
          </Box>
          </Flex>

          
        </Box>
            
            )
          })

        }
        


       </SimpleGrid>
      <Footer/>
      </div>
  )
}

export default Home