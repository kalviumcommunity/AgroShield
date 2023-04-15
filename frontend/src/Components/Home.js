import React, { useEffect } from 'react'
import { SimpleGrid,Heading, Flex, Box, Button } from '@chakra-ui/react';
import { useState,useRef} from 'react';
import { Card,Image,Divider, Stack, CardBody, CardFooter } from '@chakra-ui/react'
import image from '../assests/process.jpg'
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Spinner } from '@chakra-ui/react'
import NodeContext from '../Context/noteContext';
import Crausal from './Crausal';
import { FaPlus } from 'react-icons/fa';

function Home(props) {

  const cropname=useContext(NodeContext);

  const [search,setsearch] = useState([]);
  const [loder,setloder] = useState(false);
  const [medicine,setmedicineType]=useState("");
  const [dummy,setdummy] = useState([]);
  const [data,nodata] = useState(false);
  const [myquery,setmyquery] = useState([1,2]);

  function checkdata(){
    if(search.length===0){
      nodata(true);
    }
    else{
      nodata(false)
    }
  }

 

  const navigate=useNavigate()
      
  const API=process.env.REACT_APP_SECRET_KEY + `/userinput?cropName=${cropname.query}`


  const Token=sessionStorage.getItem("token")
  
  // if(cropname.query && cropname.search){
      
  //   fetch(API, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': 'Bearer ' + Token,
  //       "Content-type": "application/json; charset=UTF-8"
  //     }
  //   })
  //     .then(res=>res.json())
  //     .then((data)=>{
        
  //       setsearch(data);
        
  //     })
  //     .catch((err)=>{
  //       console.log(err);
  //     })
 
  // }

  useEffect(()=>{
    fetch(API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + Token,
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res=>res.json())
      .then((data)=>{
        
        setdummy(data);
        setloder(false);
      })
      .catch((err)=>{
        console.log(err);
      })
  },[cropname.search])

      const element=useRef(null);

      const id = localStorage.getItem("id");
      
      const handleelement=()=>{
        if(id){
          const card=document.getElementById(`${id}`);
          card.scrollIntoView();
        }
       
      }

      


  


  setTimeout(() => {
    handleelement()
  }, 1000);

  useEffect(()=>{
    if(dummy.length>0){
      setmyquery([1])
    }
  },[dummy.length])

    
 
  setTimeout(()=>{
    if(search.length===0 && myquery.length===1 ){
      nodata(true);
    }
  },2000)

  setTimeout(()=>{
    if(search.length>0  ){
      nodata(false)
    }
  },10)


console.log("ljhu",myquery.length)


useEffect(() => {
  if(dummy.length>0){
    setTimeout(()=>{
      setloder(false);
    },2000)




  setsearch(dummy.filter((e) => {
           return (
            (medicine)?medicine===e.type:e
           )
           
 }));
}

}, [dummy,medicine]);



function loader(){
  setloder(true);
  if(dummy.length>0){
    setTimeout(()=>{
      setloder(false);
    },2000)
  }
}

const handlefilter=()=>{

  if(document.getElementById('filter').style.display==='none'){
    document.getElementById('filter').style.display='flex'
  }
  else{
    document.getElementById('filter').style.display='none'
  }
}





   

    
          

        return (
          (cropname.query )?
          
          <>
          
          <Flex id="filter" _hover={{cursor:'pointer'}} mt={'10rem'} ml={'2rem'} justifyContent={'left'} >
          <Box mr={'1rem'} onClick={()=>{setmedicineType("");loader()}} >
            All
          </Box>
          <Box mr={'1rem'} onClick={()=>{setmedicineType("Herbicide");loader();nodata(false)}} >
            Herb
          </Box>
          <Box mr={'1rem'} onClick={()=>{setmedicineType("Insecticide");loader();nodata(false)}} >
            Insect
          </Box>
          <Box mr={'1rem'} onClick={()=>{setmedicineType("Fungicide");loader();nodata(false)}}  >
            Fung
          </Box>
          <Box mr={'1rem'} onClick={()=>{setmedicineType("Bioinsecticide");loader();nodata(false)}} >
            Bio-insect
          </Box>
          <Box onClick={()=>{setmedicineType("Biofungicide");loader();nodata(false)}}>
            Bio-fung
          </Box>
        </Flex>

 

          {(search.length>0 && !loder )?
          <SimpleGrid mt={'10rem'} p="15px" spacing={10} minChildWidth="350px" minHeight={'80vh'} >
          {
            search.map((dat, index)=>{
              return (
               
                <Card ref={element} id={`${dat._id}`} onClick={()=>{
                  navigate(`./${dat._id}`)
                  
                  
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
          
  
  
         </SimpleGrid>:
         (data)?
         <Flex justifyContent={'center'} m={'20rem'} fontSize={'3rem'} >Sorry! No data found</Flex>
:
                        <Flex justifyContent={'center'} m={'22rem'} >
                        <Spinner/>
                        </Flex>
         
         }
         <Link to={'/form'} >
      <Button
      _hover={{ backgroundColor: "black",color:'white' }}
      borderRadius={'5rem'} h={'6rem'} w={'6rem'} bottom={'5rem'} zIndex={9999} right='4rem' position={'fixed'} leftIcon={<FaPlus/>} >
      </Button>
      </Link>

        
      <Button
      onClick={()=>handlefilter()}
      _hover={{ backgroundColor: "black",color:'white' }}
      borderRadius={'5rem'}  h={'5rem'} w={'5rem'} top={'8rem'}  left='2rem' position={'fixed'}  >
        Filter
      </Button>

      


         </>
         
              :
      <Crausal/>
        )
      
     

}

export default Home