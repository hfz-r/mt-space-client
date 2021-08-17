import React from 'react';
import { Container, Flex } from '@chakra-ui/react';
import ErrorBoundary from 'containers/ErrorBoundary';
import { Header, Footer } from './components';

const FormLayout = ({ children }) => (
  <Container maxW={'7xl'} flex={'1 0 auto'} py={8} mt={20}>
    <Flex direction={'column'} w={'full'} maxW={{ lg: '100%' }}>
      {children}
    </Flex>
  </Container>
);

const LayoutWrapper = ({ isExact, children }) => (
  <ErrorBoundary>
    <Header />
    {isExact ? children : <FormLayout>{children}</FormLayout>}
    <Footer />
  </ErrorBoundary>
);

export default LayoutWrapper;
