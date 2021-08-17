import {
  Container,
  Stack,
  Heading,
  Text,
  Box,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { TextUnderline } from 'components/text-underline';
import { CONFETTI_LIGHT, CONFETTI_DARK } from './components/confettis';
import { HeroBox } from './components/hero-box';

const Feature = ({ children, ...rest }) => {
  return (
    <Stack direction={'row'} align={'center'} {...rest}>
      <Icon as={IoCheckmarkSharp} color={'green.400'} w={5} h={5} />
      <Text color={'gray.500'} fontWeight={600}>
        {children}
      </Text>
    </Stack>
  );
};

export const Hero = props => (
  <Box
    bg={useColorModeValue('gray.100', 'gray.900')}
    css={{
      backgroundImage: useColorModeValue(CONFETTI_LIGHT, CONFETTI_DARK),
      backgroundAttachment: 'fixed',
    }}
  >
    <Stack
      as={Container}
      maxW={'7xl'}
      h={{ base: '100%', lg: '100vh' }}
      minH={950}
      py={{ base: 24, lg: 32 }}
      spacing={{ base: 10, lg: 24 }}
      direction={{ base: 'column', lg: 'row' }}
      alignItems={'center'}
    >
      <Stack spacing={12} mb={{ base: 12, lg: 0 }} flex={2}>
        <Heading
          as={'h2'}
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
          maxW={'2xl'}
        >
          <TextUnderline>Production-ready</TextUnderline> Maintainance Screen
          for day-to-day operation
        </Heading>
        <Stack spacing={5}>
          <Text color={'gray.500'} fontSize={{ md: 'lg' }} maxW={'2xl'}>
            A collection of responsive forms to ease your works hence increased
            your productivity.
          </Text>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            spacing={{ base: 6, sm: 12 }}
          >
            <Stack spacing={4}>
              <Feature>Fast</Feature>
              <Feature>Easy Customizable</Feature>
            </Stack>
            <Stack spacing={4}>
              <Feature>{props.categoriesCount} Categories</Feature>
              <Feature>{props.formsCount} Forms</Feature>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <HeroBox />
    </Stack>
  </Box>
);
