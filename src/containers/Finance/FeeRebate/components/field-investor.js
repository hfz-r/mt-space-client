import React from 'react';
import { useSelector } from 'react-redux';
import { useController } from 'react-hook-form';
import {
  IconButton,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { IoClose, IoSearch } from 'react-icons/io5';
import { selectors } from 'stores';

const useInvestorContext = () => {
  const investor = useSelector(selectors.investor.makeSelectInvestor);
  return investor.getOrElse([]);
};

export const InvestorField = ({ control, ...rest }) => {
  const { investor } = useInvestorContext();
  const {
    field: { ref, onChange, value },
  } = useController({
    name: rest.id,
    control,
    rules: { required: 'Investor not found/selected.' },
    defaultValue: '',
  });

  return (
    <AutoComplete
      maxSuggestions={10}
      rollNavigation
      openOnFocus
      onChange={e => e && onChange(e)}
    >
      <InputGroup>
        <AutoCompleteInput
          {...rest}
          ref={ref}
          pr={7}
          autoComplete="off"
          value={value}
          onKeyDown={e => {
            if (e.code === 'Backspace') {
              onChange(null);
            }
          }}
        />
        <InputRightElement mr={1}>
          {value ? (
            <IconButton
              size="xs"
              variant="ghost"
              color="red"
              icon={<IoClose path="" />}
              onClick={e => onChange(null)}
              _hover={{ outline: 'none' }}
            />
          ) : (
            <IconButton
              size="lg"
              variant="ghost"
              color="black"
              icon={<IoSearch path="" />}
              _hover={{ outline: 'none' }}
            />
          )}
        </InputRightElement>
      </InputGroup>
      <AutoCompleteList>
        {investor?.map(inv => (
          <AutoCompleteItem
            key={`option-${inv.investorId}`}
            value={inv.investorName}
            textTransform="capitalize"
            disabled={inv.investorName === value}
            _selected={{ bg: 'whiteAlpha.50' }}
            _focus={{ bg: 'whiteAlpha.100' }}
            onClick={e => onChange(e.target.innerText)}
          >
            <Text textAlign="left">{inv.investorName}</Text>
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
};
