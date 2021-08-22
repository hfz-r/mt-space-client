import React from 'react';
import { useDrag } from 'react-dnd';
import { Box, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { CgMenuGridO } from 'react-icons/cg';

const DragItem = ({ type, label, isMeta, isChild, rootParentType }) => {
  const [, drag] = useDrag({
    item: { id: type, type, isMeta, rootParentType },
  });

  let boxProps = {
    ref: drag,
    color: 'whiteAlpha.800',
    cursor: 'move',
    _hover: {
      ml: -1,
      mr: 1,
      bg: useColorModeValue('gray.100', 'blue.900'),
      boxShadow: 'sm',
    },
  };

  if (isChild) {
    boxProps = { ...boxProps, ml: 4 };
  }

  return (
    <Box
      boxSizing="border-box"
      transition="margin 200ms"
      my={1}
      borderRadius="md"
      p={1}
      display="flex"
      alignItems="center"
      {...boxProps}
    >
      <Icon
        as={CgMenuGridO}
        mr={1}
        w={5}
        h={5}
        color={useColorModeValue('gray.800', 'gray.400')}
      />
      <Text
        color={useColorModeValue('gray.700', 'white')}
        letterSpacing="wide"
        fontSize="sm"
        textTransform="capitalize"
      >
        {label}
      </Text>
      {isMeta && (
        <Box
          ml={2}
          borderWidth="1px"
          color="teal.300"
          borderColor="teal.600"
          fontSize="xs"
          borderRadius={4}
          px={1}
        >
          preset
        </Box>
      )}
    </Box>
  );
};

export default DragItem;
