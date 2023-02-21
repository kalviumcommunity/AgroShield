import React from 'react'
import { Box, Button, Center, Flex, Heading, IconButton, Input, InputGroup, InputRightAddon,  LinkBox,  Spacer, useColorMode, VStack } from '@chakra-ui/react';
// import './App.css';
import     {FaSun,FaMoon, FaSearch, FaGrin}      from 'react-icons/fa'
import { Link } from 'react-router-dom';
import data from '../../Dummydata/Data';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'



function Navbar() {
  const {colorMode,toggleColorMode}  = useColorMode();

  const isDark = colorMode === "dark";


  return (
    <>
    <VStack p={5} >
     <Flex w="100%" >
      <Flex>
      <IconButton mr="2" icon={<FaGrin/>} ></IconButton>
      {/* <Heading  size="md" fontWeight={'semibold'} color="cyan.400" >
      AgroShield
      </Heading> */}
      
        
      
      
      </Flex>

     <Spacer></Spacer>

        
       <Button mr='1%' >Sign in</Button>
       
       <Button mr='1%' >Sign up</Button>
      
     <IconButton icon={isDark ?  <FaSun/> : <FaMoon/>} onClick={toggleColorMode} >

     </IconButton>
     </Flex>

     <Flex>
     <InputGroup justifyContent={'center'} >
          
          <Input  htmlSize={40} width='auto'  variant='filled' placeholder='search crop here'/>
          
          <InputRightAddon>
          <FaSearch/>
          </InputRightAddon>
          </InputGroup>
     </Flex>


     <TableContainer>
  <Table variant='simple'>
    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
    <Thead>
      <Tr>
        <Th>
        <Link to='/pesticides'>Pesticide</Link>
        </Th>
        <Th>
        <Link to='/herbicides'>Herbicide</Link>
        </Th>
        <Th >
        <Link to='/fungicides'>fungicide</Link>
        </Th>
        <Th>
        <Link to='/bio-fungicides'>Bio-fungicide</Link>
        </Th>
        <Th>
        <Link to='/bio-insecticides'>Bio-insecticides</Link>
        </Th>
      </Tr>
    </Thead>
    <Tbody>
    </Tbody>
    
  </Table>
</TableContainer>
     
     <Flex  >
      <Flex>
        
      </Flex>
        
        
        
        
        
     
     </Flex>

      

      <TableContainer m={0} p='0'>
  <Table m={0} p='0' variant='simple'>
    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
    <Thead>
      <Tr>
        <Th>Cropname</Th>
        <Th>Diseasename</Th>
        <Th >Solution</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>{data[0].Cropname}</Td>
        <Td>{data[0].Diseasename}</Td>
        <Td>{data[0].Solution}</Td>
      </Tr>
      <Tr>
        <Td>{data[1].Cropname}</Td>
        <Td>{data[1].Diseasename}</Td>
        <Td>{data[1].Solution}</Td>
      </Tr>
      
    </Tbody>
    
  </Table>
</TableContainer>

      
   
    </VStack>
    </>
  );
}

export default Navbar


