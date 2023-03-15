import React, { useEffect } from 'react'

import { SimpleGrid,Heading, Flex, Box } from '@chakra-ui/react';
import { useState } from 'react';
import Startpage from './Startpage';
import { Card,Image,Divider, Stack, CardBody, CardFooter } from '@chakra-ui/react'
import image from '../assests/blacklogo.jpg'

function Home(props) {


        const value=props.name;
      var Input=" ";
      if(value){
        Input=value.toLowerCase();
      }

  const [render, setrender] = useState(true);
  const [search,setsearch] = useState([]);
  const [temporary,setTemporary] = useState([]);
  const [apidata, setdata] = useState([])

  const API=process.env.REACT_APP_SECRET_KEY + `/userinput?cropName=${value}`
  
  const Token = sessionStorage.getItem("token")

  useEffect(() => {
    fetch(API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + Token,
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(data => {
        setdata(data);
        setTemporary(data);
        setrender(false);
      })
      .catch(err => {
        console.log(err);
        // handle error here
      })
  }, []);
  
  
      if(render){
        return <Startpage/>
      }
      else{
        return (
          (props.name)?
          <>

          <SimpleGrid mt={20} p="15px" spacing={10} minChildWidth="350px" >
          {
            search.map((dat, index)=>{
              return (
                <Card  boxShadow='2xl' p='6' rounded='md' bg='white' key={index} maxW='350px'>
                    <CardBody>
                      <Image
                      h={'200px'}
                      w='full'
                        src={image}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                      />
                      <Stack  mt='6' spacing='3'  >
      <Flex justifyContent={'space-between'} >
      <Box>
      <Heading fontSize={'17px'} fontFamily={'sans-serif'} display={'flex'} size='md'>CropName</Heading>
      <Heading fontWeight={400} fontSize={'15px'} display={'flex'} size='md'>{dat.cropName}</Heading>
      </Box>
      <Box>
      <Heading fontSize={'17px'} fontFamily={'sans-serif'} display={'flex'} size='md'>Type</Heading>
      <Heading fontWeight={400} fontSize={'15px'}  display={'flex'} size='md'>{dat.type}</Heading>
      </Box>
      </Flex>


      <Heading fontSize={'17px'} fontFamily={'sans-serif'} display={'flex'} size='md'>DiseaseName</Heading>
      <Heading fontWeight={400} fontSize={'15px'}  display={'flex'} size='md'>{dat.Disease}</Heading>
      <Heading color={'green'} fontFamily={'sans-serif'} fontSize={'17px'} display={'flex'} size='md'>Solution</Heading>
      <Heading fontWeight={400} color={'green'}  fontSize={'13px'} display={'flex'} size='md'>{dat.solution}</Heading>
      
    </Stack>
  </CardBody>
  <Divider variant="dashed" />

  <Flex justifyContent={'flex-end'} >
  <CardFooter>  
  <Heading fontWeight={5} fontSize={'10px'} size='md'>UserName : {dat.UserName}</Heading>
  </CardFooter>
  </Flex>


</Card>
              
              )
            })
  
          }
          
  
  
         </SimpleGrid>
         </>
              :
        
        
        
        
        
        
        
            
              
        
               <SimpleGrid mt={20} p="15px" spacing={10} minChildWidth="350px" >
                {
                  apidata.map((dat, index)=>{
                    return (
                      <Card  boxShadow='2xl' p='6' rounded='md' bg='white' key={index} maxW='350px'>
                    <CardBody>
                      <Image
                      h={'200px'}
                      w='full'
                        src={image}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                      />
                      <Stack  mt='6' spacing='3'  >
      <Flex justifyContent={'space-between'} >
      <Box>
      <Heading fontSize={'17px'} fontFamily={'sans-serif'} display={'flex'} size='md'>CropName</Heading>
      <Heading fontWeight={400} fontSize={'15px'} display={'flex'} size='md'>{dat.cropName}</Heading>
      </Box>
      <Box>
      <Heading fontSize={'17px'} fontFamily={'sans-serif'} display={'flex'} size='md'>Type</Heading>
      <Heading fontWeight={400} fontSize={'15px'}  display={'flex'} size='md'>{dat.type}</Heading>
      </Box>
      </Flex>


      <Heading fontSize={'17px'} fontFamily={'sans-serif'} display={'flex'} size='md'>DiseaseName</Heading>
      <Heading fontWeight={400} fontSize={'15px'}  display={'flex'} size='md'>{dat.Disease}</Heading>
      <Heading color={'green'} fontFamily={'sans-serif'} fontSize={'17px'} display={'flex'} size='md'>Solution</Heading>
      <Heading fontWeight={400} color={'green'}  fontSize={'13px'} display={'flex'} size='md'>{dat.solution}</Heading>
      
    </Stack>
  </CardBody>
  <Divider variant="dashed" />

  <Flex justifyContent={'flex-end'} >
  <CardFooter>  
  <Heading fontWeight={5} fontSize={'10px'} size='md'>UserName : {dat.UserName}</Heading>
  </CardFooter>
  </Flex>


</Card>
                    
                    )
                  })
        
                }
                
        
        
               </SimpleGrid>
        )
      }

     

}

export default Home