import React, { useEffect } from 'react'

import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import Startpage from './Startpage';


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
  fetch("http://localhost:5000/fungicide").then(res => res.json())
.then((data)=>{
  // console.log(data.answer); 
  setsearch(data.answer);
  setTemporary(data.answer);
  

}).catch((err)=>{
  console.log(err);
})
},[])

// useEffect(()=> console.log(search), [search])



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
            const fullName = e.cropName.toLowerCase();
                  return fullName.includes(searchedTerm) || fullName.startsWith(searchedTerm)  &&
                  fullName !== searchedTerm  
    
  
  
  }));
}, [props.name]);




      var filtercrop=search;

    
          
      if(render){
        return <Startpage/>
      }
      else{
        return (
          (value)?
          <SimpleGrid p="15px" spacing={10} minChildWidth="350px" >
          {
            filtercrop.map((dat, index)=>{
              return (
              <Box key={index} boxShadow='outline'  rounded='md'  fontSize={'15px'} textAlign={'left'} color={'black'} bg='white' h="200px" border="1px solid" >
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
              {dat.Disease}
            </Box>
            </Flex>
  
  
  
            <Flex justifyContent={'space-around'}>
            <Box  >
              Solution:
            </Box>
            <Box display={'flex'}  >
              {dat.Fungicide}
            </Box>
            </Flex>
  
  
  
            <Flex justifyContent={'space-around'}>
            <Box   >
              Type:
            </Box>
            <Box display={'flex'}   >
              Fungicide
            </Box>
            </Flex>
  
  
            {/* <Flex justifyContent={'space-around'}>
            <Box   >
              Username:
            </Box>
            <Box display={'flex'}    >
              {dat.UserName}
            </Box>
            </Flex> */}
  
            
          </Box>
              
              )
            })
  
          }
          
  
  
         </SimpleGrid>
              :
        
        
        
        
        
        
        
            
              
        
               <SimpleGrid p="15px" spacing={10} minChildWidth="250px" >
                {
                  apidata.map((dat, index)=>{
                    return (
                    <Box key={index} boxShadow='outline'  rounded='md'  fontSize={'15px'} textAlign={'left'} color={'black'} bg='white' h="200px" border="1px solid" >
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