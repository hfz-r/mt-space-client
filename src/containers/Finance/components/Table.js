import React, { useEffect, useMemo } from 'react';
import {
  Box,
  chakra,
  Divider,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  useExpanded,
  useFilters,
  useGroupBy,
  usePagination,
  useTable,
  useSortBy,
} from 'react-table';
import { fuzzyTextFilterFn, DefaultColumnFilter } from '../components/Filters';

const DataTable = ({ columns, data, renderSubComponent }) => {
  const { colorMode } = useColorMode();

  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLocaleLowerCase()
                .startsWith(String(filterValue).toLocaleLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    toggleHideColumn,
    visibleColumns,
    state: { pageIndex, pageSize, groupBy },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      disableMultiSort: true,
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination
  );
};
