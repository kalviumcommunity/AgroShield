


import { Center, Flex, Input,Box,Heading,FormControl,FormLabel,Button, Spacer, VStack } from '@chakra-ui/react'

import React from 'react'

function Form() {
  return (
    <div >


<Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Information Form</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <FormControl mb={'5'} >
              <FormLabel>Crop Name</FormLabel>
              <Input placeholder="Enter Crop Name..." />
            </FormControl>

            <FormControl mb={'5'} >
              <FormLabel>Days to use before harvesting</FormLabel>
              <Input type={'number'}  placeholder="Enter Days..." />
            </FormControl>

            <FormControl mb={'5'} >
              <FormLabel>Medicine Name</FormLabel>
              <Input type={'text'}  placeholder="Type Medicine name..." />
            </FormControl>

            <FormControl mb={'5'} >
              <FormLabel>Type of Medicine</FormLabel>
              <select >
            <option value="Pesticide">Pesticide</option>
            <option value="Herbicide">Herbicide</option>
            <option value="Fungicide">Fungicide</option>
            <option value="Bio-Fungicide">Bio-Fungicide</option>
            <option value="Bio-insecticide">Bio-insecticide</option>
              </select>
            </FormControl>

            <FormControl mb={'5'} >
              <FormLabel>Quantity per hectare</FormLabel>
              <Input type={'number'}  placeholder="In ml..." />
            </FormControl>


            <FormControl >
              <FormLabel>Disease Name</FormLabel>
              <Input type={'text'}  placeholder="Type Disease Name..." />
            </FormControl>


            <Button width="full" mt={4} type="submit">
              submit
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>


       
    </div>
  )
}

export default Form