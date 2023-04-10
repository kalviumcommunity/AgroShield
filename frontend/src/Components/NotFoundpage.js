



import { Box, Heading, Text } from "@chakra-ui/react";


const NotFoundPage = () => {
    return (
      <Box textAlign="center" m="25rem">
        <Heading as="h1" size="4xl" mb="4">
          404
        </Heading>
        <Text fontSize="2xl" fontWeight="bold">
          Oops! The page you are looking for does not exist.
        </Text>
      </Box>
    );
  };

  export default NotFoundPage;