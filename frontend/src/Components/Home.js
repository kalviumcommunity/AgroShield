import React, { useEffect } from 'react'

import { SimpleGrid,Heading } from '@chakra-ui/react';
import { useState } from 'react';
import Startpage from './Startpage';
import { Card,Image,Divider, Stack, CardBody, CardFooter } from '@chakra-ui/react'


function Home(props) {

  const [render, setrender] = useState(true);
  const [search,setsearch] = useState([]);
  const [temporary,setTemporary] = useState([]);
  const [apidata, setdata] = useState([])

  const API=process.env.REACT_APP_SECRET_KEY


  useEffect(()=>{
    fetch(API).then(res => res.json())
      .then((data)=>{
        setdata(data);
        setTemporary(data);
        // setTimeout(() => {
        //   setrender(false);
        // }, 3000);
        setrender(false);
        

      }).catch((err)=>{
        console.log(err);
      })
  },[]);
  



const value=props.name;
var Input=" ";
if(value){
   Input=value.toLowerCase();
}






useEffect(() => {
  setsearch(temporary.filter((e) => {
   const searchedTerm = Input;
           const fullName =   e?.cropName?.toLowerCase();
           return (props.type)?props.type==e.type && fullName.includes(searchedTerm) && fullName.startsWith(searchedTerm):fullName.includes(searchedTerm) || fullName.startsWith(searchedTerm)
   
 
 
 }));
}, [props.type,props.name]);

    
          
      if(render){
        return <Startpage/>
      }
      else{
        return (
          (value)?
          <>

          <SimpleGrid mt={20} p="15px" spacing={10} minChildWidth="350px" >
          {
            search.map((dat, index)=>{
              return (
                <Card key={index} maxW='350px'>
                <CardBody>
                  <Image
                    h={'200px'}
                    w='full'
                    src={dat.image}
                    alt='image'
                    borderRadius='lg'
                  />
                  <Stack  mt='6' spacing='3'  >
                  <Heading fontSize={'15px'} display={'flex'} size='md'>CropName : {dat.cropName}</Heading>
      <Heading fontSize={'15px'} display={'flex'} size='md'>Type : {dat.type}</Heading>
      <Heading fontSize={'15px'} display={'flex'} size='md'>DiseaseName : {dat.diseaseName}</Heading>
      <Heading color={'green.300'} fontSize={'13px'} display={'flex'} size='md'>Solution : {dat.solution}</Heading>
                    
                    
                  </Stack>
                </CardBody>
                <Divider />
              
              
                <CardFooter>
                <Heading  fontSize={'17px'} size='md'>UserName : {dat.UserName}</Heading>
                </CardFooter>
              
              
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
                      <Card key={index} maxW='350px'>
  <CardBody>
    <Image
    h={'200px'}
    w='full'
      src={dat.image}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack  mt='6' spacing='3'  >
      
      <Heading fontSize={'15px'} display={'flex'} size='md'>CropName : {dat.cropName}</Heading>
      <Heading fontSize={'15px'} display={'flex'} size='md'>Type : {dat.type}</Heading>
      <Heading fontSize={'15px'} display={'flex'} size='md'>DiseaseName : {dat.diseaseName}</Heading>
      <Heading color={'green.300'} fontSize={'13px'} display={'flex'} size='md'>Solution : {dat.solution}</Heading>
      
      
    </Stack>
  </CardBody>
  <Divider />


  <CardFooter>
  <Heading  fontSize={'17px'} size='md'>UserName : {dat.UserName}</Heading>
  </CardFooter>


</Card>
                    
                    )
                  })
        
                }
                
        
        
               </SimpleGrid>
        )
      }

     

}

export default Home