import {
  Container,
  Heading,
  Text,
  Box,
  Stack,
  Flex,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import { TextUnderline } from 'components/text-underline';

const STEPS = [
  {
    title: 'Find your form',
    text: 'Every form is design on different strategy that suite the use cases.',
  },
  {
    title: 'Do your thing',
    text: 'Start the routine. Tips provided on selected buttons by hovering the element.',
  },
  {
    title: 'Done',
    text: "You've just saved yourself a bunch of time not building the same stuff over and over again.",
  },
];

export const GettingStarted = () => {
  const { colorMode } = useColorMode();
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW={'7xl'} py={{ base: 14, sm: 20, md: 32 }}>
        <Heading as={'h3'} textAlign={'center'} mb={{ base: 14, sm: 16 }}>
          Getting started in <TextUnderline>3 easy steps</TextUnderline>
        </Heading>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify={'space-between'}
          align={{ base: 'center', sm: 'flex-start', md: 'flex-start' }}
        >
          {STEPS.map((step, index) => (
            <Stack
              textAlign={{ base: 'left', md: 'center' }}
              align={{ base: 'flex-start', md: 'center' }}
              spacing={4}
              key={step.title}
              maxW={{ base: 'full', md: 'xs' }}
              mt={{ base: 10, md: 0 }}
              _first={{
                mt: 0,
              }}
              px={4}
            >
              <Flex
                w={10}
                h={10}
                bg={colorMode === 'light' ? 'green.100' : 'green.900'}
                color={colorMode === 'light' ? 'green.700' : 'green.300'}
                fontWeight={700}
                align={'center'}
                justify={'center'}
                fontSize={'sm'}
                rounded={'md'}
              >
                0{index + 1}
              </Flex>
              <Text
                fontFamily={'heading'}
                fontSize={'xl'}
                color={colorMode === 'light' ? 'gray.700' : 'white'}
              >
                {step.title}
              </Text>
              <Text color={'gray.500'}>{step.text}</Text>
            </Stack>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};
