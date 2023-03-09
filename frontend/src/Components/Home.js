import React, { useEffect } from 'react'

import { Box, Flex, SimpleGrid,Heading,Text,Button } from '@chakra-ui/react';
import { useState } from 'react';
import Startpage from './Startpage';
import { Card,Image,Divider,ButtonGroup, Stack, CardBody, CardFooter } from '@chakra-ui/react'


function Home(props) {

  const [render, setrender] = useState(true);
  const [search,setsearch] = useState([]);
  const [temporary,setTemporary] = useState([]);
  const [apidata, setdata] = useState([])

  useEffect(()=>{
    fetch("http://localhost:2000/userinput").then(res => res.json())
      .then((data)=>{
        // console.log(data); 
        setdata(data);
        // setTimeout(() => {
        //   setrender(false);
        // }, 3000);
        setrender(false);
        

      }).catch((err)=>{
        console.log(err);
      })
  },[]);
  
useEffect(()=>{
  fetch("http://localhost:2000/userinput").then(res => res.json())
.then((data)=>{
  // console.log(data);
  setsearch(data);
  
  setTemporary(data);
  

}).catch((err)=>{
  console.log(err);
})
},[])


// useEffect(()=> console.log(temporary), [temporary])



const value=props.name;
// console.log(props.name);
var Input=" ";
if(value){
   Input=value.toLowerCase();
  // console.log(Input);
}

// useEffect(()=>{
//   console.log(value.toLowerCase());
// },[props.name])




useEffect(() => {
  setsearch(temporary.filter((e) => {
   // const z=e.cropName.toLowerCase();
   const searchedTerm = Input;
           const fullName =   e?.cropName?.toLowerCase();
           // (props.type)?console.log(props.type):console.log("propsis empty")
                 // return  fullName.includes(searchedTerm) || fullName.startsWith(searchedTerm)  &&
                 // fullName !== searchedTerm  || (props.type)?props.type==e.type:props.type!==e.type
           return (props.type)?props.type==e.type && fullName.includes(searchedTerm) && fullName.startsWith(searchedTerm):fullName.includes(searchedTerm) || fullName.startsWith(searchedTerm)
   
 
 
 }));
}, [props.type,props.name]);




      var filtercrop=search;

    
          
      if(render){
        return <Startpage/>
      }
      else{
        return (
          (value)?
          <>

          <SimpleGrid mt={20} p="15px" spacing={10} minChildWidth="350px" >
          {
            filtercrop.map((dat, index)=>{
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

     
// console.log(length);
      

  // return (
  //   // render?<Startpage />:(
  //   (value)?
  //   <div>

      
  //     {
  //       filtercrop.map((alt)=>{
  //         return(
  //           <div>
  //             {alt.cropName}
  //           </div>
  //         )
  //       })
  //     }
  //     </div>
  //     :







    
      

  //      <SimpleGrid p="15px" spacing={10} minChildWidth="250px" >
  //       {
  //         apidata.map((dat, index)=>{
  //           return (
  //           <Box key={index} boxShadow='outline'  rounded='md'  fontSize={'15px'} textAlign={'left'} color={'black'} bg='white' h="200px" border="1px solid" >
  //         <Flex justifyContent={'space-around'}>
  //         <Box mt={'2vh'} >
  //           Cropname:
  //         </Box>
  //         <Box display={'flex'}  mt={'2vh'}  >
  //           {dat.cropName}
  //         </Box>
  //         </Flex>


  //         <Flex justifyContent={'space-around'}>
  //         <Box  >
  //           Disease:
  //         </Box>
  //         <Box display={'flex'}   >
  //           {dat.diseaseName}
  //         </Box>
  //         </Flex>



  //         <Flex justifyContent={'space-around'}>
  //         <Box  >
  //           Solution:
  //         </Box>
  //         <Box display={'flex'}  >
  //           {dat.solution}
  //         </Box>
  //         </Flex>



  //         <Flex justifyContent={'space-around'}>
  //         <Box   >
  //           Type:
  //         </Box>
  //         <Box display={'flex'}   >
  //           {dat.type}
  //         </Box>
  //         </Flex>


  //         <Flex justifyContent={'space-around'}>
  //         <Box   >
  //           Username:
  //         </Box>
  //         <Box display={'flex'}    >
  //           {dat.UserName}
  //         </Box>
  //         </Flex>

          
  //       </Box>
            
  //           )
  //         })

  //       }
        


  //      </SimpleGrid>
      


  // )
  // // )
}

export default Home