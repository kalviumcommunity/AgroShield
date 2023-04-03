import React, { useEffect } from 'react'
import { SimpleGrid,Heading, Flex, Box } from '@chakra-ui/react';
import { useState,useRef} from 'react';
import { Card,Image,Divider, Stack, CardBody, CardFooter } from '@chakra-ui/react'
import image from '../assests/process.jpg'
import { useLocation,useNavigate } from 'react-router-dom';

function Home(props) {

  const pagechecker = useLocation().pathname === '/home/:id'
  const homechecker = useLocation().pathname === '/home'

 
const navigate=useNavigate()
        const value=props.name;
      var Input=" ";
      if(value){
        Input=value.toLowerCase();
      }

      const element=useRef(null);

      const id = localStorage.getItem("id");
      
      const handleelement=()=>{
        if(id){
          const card=document.getElementById(`${id}`);
          card.scrollIntoView();
        }
       
      }

      


  const [search,setsearch] = useState([]);



  setTimeout(() => {
    handleelement()
  }, 1000);
    
 







useEffect(() => {
  if(props.data){
  setsearch(props.data.filter((e) => {
           return (props.type)?props.type===e.type:e; 
 }));
}

}, [props.type,props.data]);


  if(pagechecker){
    return <></>
  }

    else if(homechecker){

    
          

        return (
          (search.length>0)?
          
          <>
          <SimpleGrid mt={'10rem'} p="15px" spacing={10} minChildWidth="350px" >
          {
            search.map((dat, index)=>{
              return (
               
                <Card ref={element} id={`${dat._id}`} onClick={()=>{
                  navigate(`/home/${dat._id}`)
                  
                  
                }}  boxShadow='2xl' p='6' rounded='md' bg='white' key={index} maxW='350px'>
                    <CardBody>
                      {
                        (dat.image)?
                        <Image
                      h={'200px'}
                      w='full'
                        src={dat.image}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                      />:
                      <Image
                      h={'200px'}
                      w='full'
                        src={image}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                      />

                      }
                      
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
      <Flex m={'20rem'} fontSize={'3rem'} justifyContent={'center'} >
        Sorry can't find data
      </Flex>
        )
      
        }
     

}

export default Home