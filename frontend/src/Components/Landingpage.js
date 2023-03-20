import { Box, Button, Flex} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'
import Login from './Login'
import Signup from './Signup'



function Landingpage() {

  const [login,setlogin] = useState(true);

  return (
    <div id='main' >
      <div id='image'  >
      <Flex className='head' justifyContent={{base:'center',md:'left',lg:'left'}} ml={'5%'} fontSize={{ base: '24px', md: '40px', lg: '56px' }} mt='13rem' >
      Empowering farmers
      <br></br>
       for a brighter future.
      </Flex>
      <Flex mt={'1rem'} justifyContent={{base:'center',md:'left',lg:'left'}} fontSize={{ base: '1.7rem', md: '2rem', lg: '2rem' }}  >
        <Box fontWeight={{base:'500',md:'100',lg:'100'}} color={{base:'green.800',md:'black',lg:'black'}} width={{base:'100vw',md:'50vw',lg:'50vw'}} >
      Get expert guidance on pest management by using our website for all your farming needs.
      Whether you're interested in urban farming, homesteading, or large-scale agriculture,  our website has everything you need to succeed and thrive.
      </Box>
      </Flex>
      </div>
      <div id='signup' >
        <Flex color='white' display={{base:'none',md:'flex',lg:'flex'}} width={'50vw'} ml={'10rem'} mt={'20rem'} fontSize={'5rem'} >
            Sign up to<br></br> Explore our <br></br> Website
            
        </Flex>
        {
          (login)?
                <Box   as={'Flex'} borderRadius={'2rem'}  color={'black'} ml={{base:'3rem',md:'0rem',lg:'0rem'}} mr='10rem' backgroundColor={'whiteAlpha.700'} mt={'5rem'} mb='5rem' justifyContent={'center'} >
                <Flex justifyContent={'center'} >
                <Login/>

                </Flex>
                <Flex mb={'3rem'} justifyContent={'center'}  fontSize='1.3rem' >
                      <Flex>Already a member?</Flex>
                      <Link to={'/'} >
                      <Flex onClick={()=>{setlogin(false)}}  >Log in</Flex>
                      </Link>
                      </Flex>  
                </Box>:

                  <Box  ml={{base:'3rem',md:'0rem',lg:'0rem'}} as={'Flex'} borderRadius={'2rem'}  color={'black'} mr='10rem' backgroundColor={'whiteAlpha.700'} mt={'5rem'} mb='5rem' justifyContent={'center'} >
                  <Flex justifyContent={'center'} >
                  <Signup/>

                  </Flex>
                  <Flex justifyContent={'center'}  fontSize='1.3rem' >
                        <Flex>Not on Agroshield yet?</Flex>
                        <Link to={'/'} >
                        <Flex onClick={()=>{setlogin(true)}}  >Sign up</Flex>
                        </Link>
                        </Flex>  
                  </Box>
        }
           
      </div>

        <div id='aboutus' >
        <Flex justifyContent={'center'} color='black' mt={'10rem'} fontSize={'3rem'} >
            Our Main motive is to provide proper solution to farmers
          </Flex>
          <Flex justifyContent={'center'} color='black' mt={'10rem'} fontSize={'3rem'} >
            I am currently looking for internship contact me at kalvium.community 
          </Flex>
          <Flex justifyContent={'center'} color='black' fontSize={'5rem'} >
            Made With Love ❤️ by anmol virk
          </Flex>
        </div>


    </div>
  )
}

export default Landingpage