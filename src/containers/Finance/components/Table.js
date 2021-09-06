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
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { fuzzyTextFilterFn, DefaultColumnFilter } from '../components/Filters';
import Pagination from './Pagination';

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

  useEffect(() => {
    toggleHideColumn('expander', !!groupBy.length);
  }, [groupBy, toggleHideColumn]);

  return (
    <>
      <Flex
        pt={5}
        h={'full'}
        w={'full'}
        direction={'column'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Table
          size="sm"
          // variant="striped"
          // colorScheme="blue"
          display="block"
          pos="relative"
          overflow="auto"
          {...getTableProps()}
        >
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr
                key={`headerrow-${headerGroup.key}`}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column, headerIndex) => (
                  <Th
                    key={`headercol-${headerIndex}`}
                    {...column.getHeaderProps([
                      {
                        className: column.className,
                        style: column.style,
                      },
                    ])}
                    isNumeric={column.isNumeric}
                  >
                    <Flex {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      <chakra.span pl={3}>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <GoTriangleDown aria-label="sorted descending" />
                          ) : (
                            <GoTriangleUp aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Flex>
                    {/* menu */}
                    {column.id !== 'expander' && (
                      <>
                        <Divider my={2} />
                        {/* <MenuWrapper
                        key={`menu-${headerIndex}`}
                        column={column}
                      /> */}
                      </>
                    )}
                    {/* columns filter */}
                    <Box mt={4}>
                      {column.canFilter ? column.render('Filter') : null}
                    </Box>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              const rowProps = row.getRowProps();
              return (
                <React.Fragment key={`bodyrow-${rowProps.key}`}>
                  <Tr
                    bg={colorMode === 'dark' && row.isExpanded && 'gray.700'}
                    {...rowProps}
                  >
                    {row.cells.map((cell, cellIndex) => {
                      return (
                        <Td
                          key={`bodycol-${cellIndex}`}
                          {...cell.getCellProps([
                            {
                              className: cell.column.className,
                              style: cell.column.style,
                            },
                          ])}
                          isNumeric={cell.column.isNumeric}
                        >
                          {cell.isGrouped ? (
                            <>
                              <chakra.span {...row.getToggleRowExpandedProps()}>
                                {row.isExpanded ? '🔽 ' : '▶️ '}
                              </chakra.span>
                              {cell.render('Cell')} ({row.subRows.length})
                            </>
                          ) : cell.isAggregated ? (
                            cell.render('Aggregated')
                          ) : cell.isPlaceholder ? null : (
                            cell.render('Cell')
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                  {/* sub-component */}
                  {row.isExpanded &&
                    renderSubComponent({ row, visibleColumns })}
                </React.Fragment>
              );
            })}
          </Tbody>
        </Table>
        {/* pagination */}
        <Pagination
          total={data.length}
          gotoPage={gotoPage}
          previousPage={previousPage}
          nextPage={nextPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </Flex>
    </>
  );
};

export default DataTable;
