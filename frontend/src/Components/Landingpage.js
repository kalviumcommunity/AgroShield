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
      <Flex color={'blue.800'}  cursor={'pointer'} fontSize={'2.5rem'} justifyContent={'flex-end'} >
        <Box _hover={{ textDecoration: "underline", color: "blue.500" }} mr={'2%'} >Home</Box>
        <Box _hover={{ textDecoration: "underline", color: "blue.500" }} mr={'2%'} >Login</Box>
        <Box _hover={{ textDecoration: "underline", color: "blue.500" }} mr={'2%'} >About us</Box>
      </Flex>
      <Flex ml={'5%'} fontSize={'6rem'} mt='13rem' >
      Empowering farmers
      <br></br>
       for a brighter future.
      </Flex>
      <Flex mt={'1rem'} justifyContent={'left'} fontSize={'2rem'}  >
        <Box width={'50vw'} >
      Get expert guidance on pest management by using our website for all your farming needs.
      Whether you're interested in urban farming, homesteading, or large-scale agriculture,  our website has everything you need to succeed and thrive.
      </Box>
      </Flex>
      </div>
      <div id='signup' >
        <Flex width={'50vw'} ml={'10rem'} mt={'20rem'} fontSize={'5rem'} >
            Sign up to<br></br> Explore our <br></br> Website
            
        </Flex>
        {
          (login)?
                <Box as={'Flex'} borderRadius={'2rem'} width={'25vw'} color={'black'} mr='10rem' backgroundColor={'whiteAlpha.700'} mt={'5rem'} mb='5rem' justifyContent={'center'} >
                <Flex justifyContent={'center'} >
                <Login/>

                </Flex>
                <Flex justifyContent={'center'}  fontSize='1.3rem' >
                      <Flex>Already a member?</Flex>
                      <Link to={'/'} >
                      <Flex onClick={()=>{setlogin(false)}}  >Log in</Flex>
                      </Link>
                      </Flex>  
                </Box>:

                  <Box as={'Flex'} borderRadius={'2rem'} width={'25vw'} color={'black'} mr='10rem' backgroundColor={'whiteAlpha.700'} mt={'5rem'} mb='5rem' justifyContent={'center'} >
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