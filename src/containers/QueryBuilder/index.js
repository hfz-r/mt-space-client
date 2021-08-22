import React from 'react';
import { Flex } from '@chakra-ui/react';
import useShortcuts from 'hooks/Shortcuts';
import { Header } from './Header/';
import { Body } from './Body';

const QueryBuilder = () => {
  useShortcuts();
  return (
    <Flex direction={'column'} w={'full'} mt={20} mb={5} maxW={{ lg: '100%' }}>
      <Header />
      <Body />
    </Flex>
  );
};

export default QueryBuilder;
