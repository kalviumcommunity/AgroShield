import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Input,Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {AiOutlineComment} from 'react-icons/ai'
import {BsImage} from 'react-icons/bs'
import image from '../assests/process.jpg'
import { FaPlus } from 'react-icons/fa';

function Data() {
   
    const [data,setdata] = useState([]);
    const [imagelink,setimagelink] = useState('');
    const [comment,setcomment] = useState('');
    const {id} = useParams();
    const Token = sessionStorage.getItem("token");


    const API1=process.env.REACT_APP_SECRET_KEY+`/data/${id}`

    useEffect(()=>{
        fetch(API1,{
            method:"GET",
            headers: {
                'Authorization': 'Bearer ' + Token,
                  "Content-type": "application/json; charset=UTF-8"
              }
        }).then(res=>res.json())
        .then((data)=>{
            // console.log(data.data)
            setdata(data.data);
        }).catch(Error=>console.log(Error))
    },[])

    const API=process.env.REACT_APP_SECRET_KEY+ `/image/${id}`

    const handleimageinput=()=>{
        if(imagelink!==' '){
            fetch(API,{
                method:'PUT',
                body: JSON.stringify({
                    "image":imagelink
                }),
                headers: {
                    'Authorization': 'Bearer ' + Token,
                      "Content-type": "application/json; charset=UTF-8"
                  }
            }).then(res=>res.json())
            .then((data)=>{
                setdata([]);
                setdata([data]);
            }).catch(err=>console.log(err));
        }
    }

    const COMMENT=process.env.REACT_APP_SECRET_KEY+ `/comment/${id}`

    localStorage.setItem("id",id)

    const handlecommentinput=()=>{
        if(comment!==' '){
            fetch(COMMENT,{
                method:'POST',
                body: JSON.stringify({
                    "comment":comment
                }),
                headers: {
                    'Authorization': 'Bearer ' + Token,
                      "Content-type": "application/json; charset=UTF-8"
                  }
            }).then(res=>res.json())
            .then((data)=>{
                setdata([]);
                setdata([data]);
                
            }).catch(err=>console.log(err));
        }
    }
    






    return (
        <div style={{minHeight:'100vh'}}>
            <Box mt={'4rem'} display="flex" justifyContent="center" alignItems="center">
    
            {
                (data.length>0)?
            data.map((dat)=>{
                return(
    
    
            <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      h={{base:'full',sm:'full',lg:'80vh'}}
      w={{base:'80vw',sm:'95vw',lg:'85vw'}}
    
      mb={'20rem'}
    >
    
        {
            (dat.image)?
            <Image
        objectFit='cover'
        maxW={{ base: '500px', sm: '250px',lg:'900px' }}
        maxH={{ base: '300px', sm: '600px',lg:'900px' }}
        src={dat.image}
        alt='Caffe Latte'
      />:
      <Image
        objectFit='cover'
        maxW={{ base: '500px', sm: '250px',lg:'900px' }}
        maxH={{ base: '300px', sm: '600px',lg:'900px' }}
        src={image}
      />
        }
    
    
      <Stack>
    
                    <CardBody>
                    <Stack  mt='6' spacing='3'  >
                      
                      <Box>
                      <Heading fontSize={'18px'} fontFamily={'sans-serif'} display={'flex'} size='md'>CropName</Heading>
                      <Heading fontWeight={400} fontSize={'14px'} display={'flex'} size='md'>{dat.cropName}</Heading>
                      </Box>
                      <Box>
                      <Heading fontSize={'18px'} fontFamily={'sans-serif'} display={'flex'} size='md'>Type</Heading>
                      <Heading fontWeight={400} fontSize={'14px'}  display={'flex'} size='md'>{dat.type}</Heading>
                      </Box>
                      
                
                
                      <Heading fontSize={'18px'} fontFamily={'sans-serif'} display={'flex'} size='md'>DiseaseName</Heading>
                      <Heading fontWeight={400} fontSize={'14px'}  display={'flex'} size='md'>{dat.Disease}</Heading>
                      <Heading color={'green'} fontFamily={'sans-serif'} fontSize={'18px'} display={'flex'} size='md'>Solution</Heading>
                      <Heading fontWeight={400} color={'green'}  fontSize={'14px'} display={'flex'} size='md'>{dat.solution}</Heading>
    
    
                      <Heading color={'green'} fontFamily={'sans-serif'} fontSize={'18px'} display={'flex'} size='md'>Comments</Heading>
                      {
                        (dat.comment.length>0)?
                        (
                         dat.comment.map((alt)=>{
                            return(
                                <Heading fontWeight={400} color={'green'}  fontSize={'14px'} display={'flex'} size='md'>
                               {alt.data}
                               </Heading>
                            )
                        })
                        )
                       :
                        <Heading fontWeight={400} color={'green'}  fontSize={'14px'} display={'flex'} size='md'>no comments yet</Heading>
                      }
                      
                      
                    </Stack>
                    </CardBody>
    
    
        <CardFooter>
        <Box mb={'5rem'} justifyContent={'space-around'} >
            {
                (dat.image)?<></>:
                <Flex mb={'1rem'} >
                    <Input onChange={(e)=>setimagelink(e.target.value)} placeholder='Provide Image link here' fontSize={'1rem'} w='20rem' h={'4rem'} ></Input>
                    <Button ml={'1rem'} rightIcon={<BsImage/>} onClick={()=>handleimageinput()} fontSize={'1.5rem'} h={'4rem'} w='10rem' >Add </Button>
                </Flex>
            }
                
                <Flex>
                    <Input onChange={(e)=>{setcomment(e.target.value)}} placeholder='Add comments here' fontSize={'1rem'} w='20rem' h={'4rem'} ></Input>
                    <Button ml={'1rem'} rightIcon={<AiOutlineComment/>} onClick={()=>{handlecommentinput()}} fontSize={'1.5rem'} h={'4rem'} w='10rem' >Add </Button>
             </Flex>
             </Box>
      
        </CardFooter>
      </Stack>
    </Card>
    
    )
    })
    :
    <Box textAlign="center" mt="20">
        <Heading as="h1" size="4xl" mb="4">
          404
        </Heading>
        <Text fontSize="2xl" fontWeight="bold">
          Oops! The page you are looking for does not exist.
        </Text>
      </Box>
    
    }
    <Link to={'/form'} >
      <Button
      _hover={{ backgroundColor: "black",color:'white' }}
      borderRadius={'5rem'} h={'6rem'} w={'6rem'} bottom={'5rem'} zIndex={9999} right='4rem' position={'fixed'} leftIcon={<FaPlus/>} >
      </Button>
      </Link>
             </Box>
    
       
        </div>
      )
}

export default Data