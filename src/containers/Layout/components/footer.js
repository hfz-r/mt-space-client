import React from 'react';
import { HStack, Button, Text, useColorModeValue } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import Container from 'components/container';

const FooterLink = props => {
  const { href, name, ...rest } = props;

  return (
    <NavLink to={href}>
      <Button
        variant="unstyled"
        _hover={{ color: useColorModeValue('gray.600', 'gray.500') }}
        color={useColorModeValue('gray.500', 'gray.600')}
        {...rest}
      >
        {name}
      </Button>
    </NavLink>
  );
};

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <Container>
      <HStack
        justify="space-between"
        w="100%"
        display={{ base: 'none', md: 'flex' }}
        py={4}
      >
        <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.600')}>
          © {date} Affin Hwang Asset Management{' '}
        </Text>
        <HStack spacing={4}>
          <FooterLink href="/disclaimer" name="Disclaimer" />
          <FooterLink href="/privacy" name="Privacy" />
        </HStack>
      </HStack>
    </Container>
  );
};

export default Footer;
