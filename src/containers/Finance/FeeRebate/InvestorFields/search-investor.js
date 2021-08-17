import React, { forwardRef, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  ButtonGroup,
  IconButton,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { IoClose, IoSearch } from 'react-icons/io5';
import { selectors } from 'stores';

const useData = () => {
  const memoizeData = useMemo(() => selectors.investor.makeSelectInvestor, []);
  const investor = useSelector(state => memoizeData(state));
  return investor.getOrElse([]);
};

const TextInput = forwardRef((props, ref) => (
  <AutoCompleteInput ref={ref} {...props} />
));

export const InvestorSearch = ({ fieldRef, onClose, onCancel }) => {
  const { investor } = useData();
  const [searchTerm, setSearchTerm] = useState(null);

  const handleSelect = e => {
    const res = investor.find(i => i.investorName === searchTerm);
    onClose(res);
  };

  const handleCancel = e => {
    setSearchTerm(null);
    onCancel();
  };

  const SearchInput = () => (
    <InputGroup>
      <AutoComplete
        maxSuggestions={10}
        rollNavigation
        freeSolo
        onChange={val => val && setSearchTerm(val)}
      >
        <TextInput
          ref={fieldRef}
          value={searchTerm}
          placeholder={'Investor name'}
          color={useColorModeValue('gray.800', 'gray.200')}
          bg={useColorModeValue('gray.100', 'gray.600')}
          rounded={'full'}
          border={0}
          _focus={{
            bg: useColorModeValue('gray.200', 'gray.800'),
            outline: 'none',
          }}
          onKeyDown={e => {
            if (e.keyCode === 8) {
              setSearchTerm(null)
            }
          }}
        />
        <AutoCompleteList>
          {investor?.map(inv => (
            <AutoCompleteItem
              key={`option-${inv.investorId}`}
              value={inv.investorName}
              textTransform="capitalize"
              _selected={{ bg: 'whiteAlpha.50' }}
              _focus={{ bg: 'whiteAlpha.100' }}
            >
              <Text textAlign="left">{inv.investorName}</Text>
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
      <InputRightElement zIndex={11}>
        {searchTerm ? (
          <IconButton
            size="xs"
            variant="ghost"
            icon={<IoClose path="" />}
            onClick={() => setSearchTerm(null)}
            _hover={{ outline: 'none' }}
          />
        ) : (
          <IoSearch path="" />
        )}
      </InputRightElement>
    </InputGroup>
  );

  return (
    <Stack spacing={4} my={3} direction={'column'} w={'full'}>
      <SearchInput />
      <ButtonGroup d="flex">
        <Button
          w={1 / 3}
          rounded={'full'}
          color={'white'}
          flex={'1 0 auto'}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          w={2 / 3}
          bg={'blue.400'}
          rounded={'full'}
          color={'white'}
          flex={'1 0 auto'}
          _hover={{ bg: 'blue.500' }}
          _focus={{ bg: 'blue.500' }}
          isDisabled={!!!searchTerm}
          onClick={handleSelect}
        >
          Select
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
