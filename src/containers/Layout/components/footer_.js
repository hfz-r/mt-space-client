import {
  Icon,
  Image,
  Box,
  Text,
  Link,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { BsHeartFill } from 'react-icons/bs';
import { Link as NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box pt={20} pb={10}>
      <Flex
        align={'center'}
        _before={{
          content: '""',
          borderBottom: '1px solid',
          borderColor: useColorModeValue('gray.200', 'gray.700'),
          flexGrow: 1,
          mr: 8,
        }}
        _after={{
          content: '""',
          borderBottom: '1px solid',
          borderColor: useColorModeValue('gray.200', 'gray.700'),
          flexGrow: 1,
          ml: 8,
        }}
      >
        <Link as={NavLink} to="/">
          <Image
            w={{ base: 12 }}
            h={{ base: 12 }}
            objectFit="cover"
            src="/logo-only-affinhwang.png"
            fallbackSrc="https://via.placeholder.com/150"
            alt="affinhwang-am logo"
          />
        </Link>
      </Flex>
      <Text pt={6} fontSize={'xs'} textAlign={'center'}>
        Made with <Icon as={BsHeartFill} color={'darkred'} /> by{' '}
        <Text as="sub" color="blue.300">
          Affin Hwang AM
        </Text>
      </Text>
    </Box>
  );
};

export default Footer;
