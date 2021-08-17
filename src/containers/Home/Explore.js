import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as NavLink } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';

export const ExploreForms = ({ formsCount }) => (
  <Box bg={useColorModeValue('blue.50', 'gray.800')}>
    <Container maxW={'7xl'} py={{ base: 14, sm: 20, md: 32 }}>
      <Box
        bg={useColorModeValue('blue.400', 'blue.500')}
        rounded={'xl'}
        color={useColorModeValue('white', 'gray.100')}
        px={{ base: 4, md: 10 }}
        py={10}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Box>
            <Heading as={'h3'} mb={2}>
              Explore {formsCount - 1}+ production-ready Maintainance Screen
            </Heading>
            <Text fontSize={'lg'}>and start saving your time today!</Text>
          </Box>
          <Flex w={'full'} align={'center'} justify={'center'}>
            <Button
              as={NavLink}
              to="/finance"
              bg={'blue.600'}
              color={'white'}
              px={8}
              size={'lg'}
              fontSize={'md'}
              rounded={'md'}
              rightIcon={<IoArrowForward />}
              _hover={{
                bg: 'blue.700',
              }}
            >
              Browse Forms
            </Button>
          </Flex>
        </SimpleGrid>
      </Box>
    </Container>
  </Box>
);
