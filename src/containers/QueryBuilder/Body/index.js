import React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { InspectorProvider } from 'contexts/inspector-context';
import EditorErrorBoundary from 'containers/ErrorBoundary';
import Sidebar from '../Sidebar';
import Editor from './Editor';

export const Body = () => {
  return (
    <DndProvider backend={Backend}>
      <Flex h="calc(100vh - 3rem)">
        <Sidebar />
        <EditorErrorBoundary>
          <Box flex={1} position="relative">
            <Editor />
          </Box>
        </EditorErrorBoundary>

        <Box
          mt={4}
          h="100%"
          maxH="calc(100vh - 3rem)"
          flex="0 0 14rem"
          //bg="#f7fafc"
          bg={useColorModeValue('gray.50', 'blackAlpha.600')}
          overflowY="auto"
          overflowX="visible"
          //borderLeft="1px solid #cad5de"
        >
          <InspectorProvider>{/* <Inspector /> */}</InspectorProvider>
        </Box>
      </Flex>
    </DndProvider>
  );
};
