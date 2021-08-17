import React, { useMemo } from 'react';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  chakra,
} from '@chakra-ui/react';
import { MdArrowDropDown, MdSearch } from 'react-icons/md';
import { matchSorter } from 'match-sorter';

/*
 * filter type definition
 */
const fuzzyTextFilterFn = (rows, id, filterValue) =>
  matchSorter(rows, filterValue, { keys: [row => row.values[id]] });

fuzzyTextFilterFn.autoRemove = val => !val;

/*
 * custom filter interface
 */
const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length;

  return (
    <Box pb={2}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          pb={1} 
          children={<MdSearch color="gray.300" />}
        />
        <Input
          size="sm"
          variant="filled"
          value={filterValue}
          onChange={e => setFilter(e.target.value)}
          placeholder={`Search ${count} records`}
        />
      </InputGroup>
    </Box>
  );
};

const NumberRangeColumnFilter = ({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) => {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <Flex pb={2}>
      <Input
        size="sm"
        type={'number'}
        w={70}
        mr="0.5rem"
        variant="filled"
        value={filterValue[0]}
        onChange={e => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        placeholder={`Min (${min})`}
      />
      <chakra.span mt={2}>{'to'}</chakra.span>
      <Input
        size="sm"
        type={'number'}
        w={70}
        ml="0.5rem"
        variant="filled"
        value={filterValue[1]}
        onChange={e => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        placeholder={`Max (${max})`}
      />
    </Flex>
  );
};

const SelectColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter, id },
}) => {
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <Box pb={2}>
      <Select
        size="sm"
        variant="filled"
        icon={<MdArrowDropDown />}
        value={filterValue}
        onChange={e => setFilter(e.target.value)}
      >
        <option value="">All</option>
        {options.sort().map(
          (option, i) =>
            option !== '' && (
              <option key={i} value={option}>
                {option}
              </option>
            )
        )}
      </Select>
    </Box>
  );
};

export {
  fuzzyTextFilterFn,
  DefaultColumnFilter,
  NumberRangeColumnFilter,
  SelectColumnFilter,
};
