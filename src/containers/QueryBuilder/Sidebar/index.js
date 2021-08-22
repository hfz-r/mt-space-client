import React, { useState, memo } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { filter, keys, map, pipe } from 'ramda';
import { IoClose, IoSearch } from 'react-icons/io5';
import { queryItems } from 'utils/base-query-items';
import DragItem from './DragItem';

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Box
      maxH="calc(100vh - 3rem)"
      overflowY="auto"
      overflowX="visible"
      boxShadow={'sm'}
      flex="0 0 14rem"
      p={5}
      as="menu"
      bg={useColorModeValue('gray.50', 'blackAlpha.600')}
      h="100%"
      w="15rem"
    >
      <InputGroup size="sm" mb={4}>
        <Input
          value={searchTerm}
          placeholder="Search component…"
          onChange={event => setSearchTerm(event.target.value)}
          borderColor="rgba(255, 255, 255, 0.04)"
          _hover={{
            borderColor: 'rgba(255, 255, 255, 0.08)',
          }}
          color={useColorModeValue('gray.800', 'gray.300')}
          bg={useColorModeValue('gray.100', 'rgba(255, 255, 255, 0.06)')}
          rounded={'full'}
          zIndex={0}
        />
        <InputRightElement zIndex={1}>
          {searchTerm ? (
            <IconButton
              size="xs"
              color="gray.300"
              aria-label="clear"
              variant="ghost"
              icon={<IoClose path="" />}
              _hover={{ outline: 'none' }}
              onClick={() => setSearchTerm('')}
            />
          ) : (
            <IoSearch path="" color="gray.300" />
          )}
        </InputRightElement>
      </InputGroup>

      {pipe(
        keys,
        filter(q => q.toLowerCase().includes(searchTerm.toLowerCase())),
        map(q => {
          const { children } = queryItems[q];
          if (children) {
            const el = pipe(
              keys,
              map(c => (
                <DragItem
                  isChild
                  key={c}
                  label={c}
                  type={c}
                  id={c}
                  rootParentType={queryItems[q]?.rootParentType || q}
                >
                  {c}
                </DragItem>
              ))
            )(children);

            return [
              <DragItem
                isMeta
                key={`${q}Meta`}
                label={q}
                type={`${q}Meta`}
                id={`${q}Meta`}
                rootParentType={queryItems[q]?.rootParentType || q}
              >
                {q}
              </DragItem>,
              ...el,
            ];
          }
          return (
            <DragItem
              key={q}
              label={q}
              type={q}
              id={q}
              rootParentType={queryItems[q]?.rootParentType || q}
            >
              {q}
            </DragItem>
          );
        })
      )(queryItems)}
    </Box>
  );
};

export default memo(Menu);
