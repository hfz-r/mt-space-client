import { Box, useColorModeValue } from '@chakra-ui/react';

export const TextUnderline = ({ children }) => {
  return (
    <Box
      as={'span'}
      color={useColorModeValue('blue.400', 'blue.300')}
      position={'relative'}
      zIndex={10}
      _after={{
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: 0,
        w: 'full',
        h: '30%',
        bg: useColorModeValue('blue.100', 'blue.900'),
        zIndex: -1,
      }}
    >
      {children}
    </Box>
  );
};
