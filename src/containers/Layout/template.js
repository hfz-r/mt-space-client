import React from 'react';
import { Box } from '@chakra-ui/react';
import ErrorBoundary from 'containers/ErrorBoundary';
import { Header, Footer } from './components';

const LayoutWrapper = ({ children }) => {
  return (
    <ErrorBoundary>
      <Header />
      <Box as="main" pt={{ base: 16, md: 24 }} pb={{ base: 24, md: 16 }}>
        {children}
      </Box>
      <Footer />
    </ErrorBoundary>
  );
};

export default LayoutWrapper;
