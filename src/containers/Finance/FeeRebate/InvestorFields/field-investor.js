import React, { memo, useCallback, useState } from 'react';
import {
  chakra,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoClose, IoCheckmark } from 'react-icons/io5';
import { InvestorPopover } from './popover-investor';

const InvestorField = ({ onChange }) => {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const [investor, setInvestor] = useState(null);

  const handlePopoverClose = useCallback(
    val => {
      onChange(val && val.investorId);
      setInvestor(val);
      setIsOpen(false);
    },
    [onChange]
  );

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      w="sm"
      mb={3}
      mx="auto"
    >
      <Box
        bg="gray.900"
        h={44}
        w="full"
        rounded="lg"
        shadow="md"
        bgSize="cover"
        bgPos="center"
        style={{
          backgroundImage: investor
            ? 'none'
            : 'url(https://dummyimage.com/600x400/2e3038/ffffff&text=No+investor+found)',
        }}
      >
        {investor && (
          <Stack
            p={3}
            spacing={2}
            letterSpacing={1}
            textAlign="center"
            fontWeight="bold"
            textTransform="uppercase"
            color={colorMode === 'light' ? 'gray.800' : 'white'}
          >
            <Heading as="h3" size="lg">
              {investor.investorId}
            </Heading>
            <Text fontSize="lg">{investor.investorName}</Text>
          </Stack>
        )}
      </Box>

      <Box
        bg={useColorModeValue('white', 'gray.800')}
        w={36}
        mt={-10}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <chakra.h3
          py={2}
          textAlign="center"
          fontWeight="bold"
          textTransform="uppercase"
          color={useColorModeValue('gray.800', 'white')}
          letterSpacing={1}
        >
          Investor
        </chakra.h3>

        <Flex
          alignItems="center"
          justifyContent="space-between"
          py={2}
          px={3}
          bg={useColorModeValue('gray.200', 'gray.700')}
        >
          {investor ? (
            <IoCheckmark fontSize={25} color={'green'} />
          ) : (
            <IoClose fontSize={25} color={'red'} />
          )}

          <chakra.button
            type="button"
            bg="gray.800"
            fontSize="xs"
            fontWeight="bold"
            color="white"
            px={2}
            py={1}
            rounded="lg"
            textTransform="uppercase"
            _hover={{
              bg: useColorModeValue('gray.700', 'gray.600'),
            }}
            _focus={{
              bg: useColorModeValue('gray.700', 'gray.600'),
              outline: 'none',
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            Search
          </chakra.button>
        </Flex>
      </Box>
      <InvestorPopover isOpen={isOpen} onClose={handlePopoverClose} />
    </Flex>
  );
};

export default memo(InvestorField);
