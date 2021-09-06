import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  useFlexLayout,
  useResizeColumns,
  useSortBy,
  useTable,
} from 'react-table';
import { filter } from 'ramda';
import {
  Box,
  Center,
  Flex,
  IconButton,
  Spinner,
  Text,
  Tr,
  Td,
  chakra,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { GoX, GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import useChildContext from 'hooks/ChildData';
import ActionButton from './action-button';
import EditableCell from './editable-cell';
import ErrorPage from './ErrorPage';

const SubRow = ({
  data,
  addData,
  updateData,
  removeData,
  refreshData,
  skipReset,
}) => {
  const { colorMode } = useColorMode();

  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 140,
      maxWidth: 200,
      Cell: EditableCell,
    }),
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'COA',
        accessor: 'coa',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Currency',
        accessor: 'currency',
      },
      {
        Header: 'AMC',
        accessor: 'amc',
      },
      {
        Header: 'DrCr',
        accessor: 'drcr',
      },
    ],
    []
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
      updateData,
      autoResetPage: !skipReset,
      disableMultiSort: true,
      initialState: {
        hiddenColumns: ['id'],
      },
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    hooks => {
      hooks.visibleColumns.push(columns => {
        return [
          {
            id: 'selection',
            disableResizing: true,
            minWidth: 40,
            maxWidth: 35,
            width: 40,
            Cell: ({ row }) => (
              <IconButton
                color="red.400"
                bg="transparent"
                size="xs"
                rounded="full"
                label="Delete record"
                _focus={{ boxShadow: 'none' }}
                onClick={e => removeData(row.values.id)}
                icon={<GoX />}
              />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  return (
    <>
      <Box
        m={4}
        px={3}
        pb={3}
        pt={2}
        pos="relative"
        boxShadow={'xl'}
        borderWidth="1px"
        borderColor={useColorModeValue('gray.100', 'gray.900')}
        bg={useColorModeValue('gray.50', 'gray.700')}
      >
        <Flex pb={1} justify={'flex-end'}>
          <ActionButton addData={addData} refreshData={refreshData} />
        </Flex>
        <Box
          display="block"
          fontSize="sm"
          borderWidth="1px"
          borderColor={useColorModeValue('gray.100', 'gray.900')}
          {...getTableProps()}
        >
          <Box>
            {headerGroups.map((headerGroup, i) => (
              <Flex
                key={i}
                flex={1}
                minH="34px"
                borderBottom="1px"
                borderColor={colorMode === 'light' ? 'gray.100' : 'gray.900'}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column, i, cols) => (
                  <Text
                    key={i}
                    as="div"
                    p={3}
                    m={0}
                    fontWeight="bold"
                    textTransform="uppercase"
                    textAlign="left"
                    borderRight="1px"
                    borderColor={
                      colorMode === 'light' ? 'gray.100' : 'gray.900'
                    }
                    sx={{
                      ':last-child': {
                        borderRight: 0,
                      },
                    }}
                    {...column.getHeaderProps([
                      {
                        className: column.className,
                        style: {
                          justifyContent:
                            column.align === 'right'
                              ? 'flex-end'
                              : 'flex-start',
                          alignItems: 'flex-start',
                          display: 'flex',
                        },
                      },
                    ])}
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
                    {column.canResize && i < cols.length - 1 && (
                      <Box
                        pos="absolute"
                        top="0"
                        right="0"
                        w={10}
                        h="100%"
                        zIndex={1}
                        style={{ touchAction: 'none' }}
                        {...column.getResizerProps()}
                      />
                    )}
                  </Text>
                ))}
              </Flex>
            ))}
          </Box>
          <Box>
            {rows.length ? (
              rows.map(row => {
                prepareRow(row);
                return (
                  <Flex
                    key={row.id}
                    data-rowindex={row.index}
                    flex={1}
                    minH="24px"
                    // roundedBottom={
                    //   row.index === rows.length - 1 ? 'xl' : 'none'
                    // }
                    // _hover={{
                    //   bg: colorMode === 'light' ? 'blue.50' : 'gray.600',
                    // }}
                    {...row.getRowProps()}
                  >
                    {row.cells.map(cell => {
                      return (
                        <Text
                          key={row.id + '_' + cell.index}
                          as="div"
                          py={1}
                          px={1.5}
                          m={0}
                          borderRight="1px"
                          borderColor={
                            colorMode === 'light' ? 'gray.100' : 'gray.900'
                          }
                          sx={{
                            ':last-child': {
                              borderRight: 0,
                            },
                          }}
                          wordBreak="break-all"
                          {...cell.getCellProps([
                            {
                              className: cell.column.className,
                              style: {
                                justifyContent:
                                  cell.column.align === 'right'
                                    ? 'flex-end'
                                    : cell.column.id === 'selection'
                                    ? 'center'
                                    : 'flex-start',
                                alignItems:
                                  cell.column.id === 'selection'
                                    ? 'center'
                                    : 'flex-start',
                                display: 'flex',
                              },
                            },
                          ])}
                        >
                          {cell.render('Cell', { editable: true })}
                        </Text>
                      );
                    })}
                  </Flex>
                );
              })
            ) : (
              <Text as="div" p="4px 24px">
                {'No records'}
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

const Loading = ({ column }) => (
  <Tr>
    <Td colSpan={column.length}>
      <Center p={10}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.300"
          size="xl"
        />
      </Center>
    </Td>
  </Tr>
);

const Error = ({ column, error }) => (
  <Tr>
    <Td colSpan={column.length}>
      <ErrorPage message={error} />
    </Td>
  </Tr>
);

const SubTable = ({ parentVisibleColumns, parentData }) => {
  const id = parentData.values['investor.investorId'];
  const {
    data,
    getData: get,
    addData: add,
    updateData: update,
  } = useChildContext(id);
  const skipResetRef = useRef(false);

  const addData = useCallback(() => {
    skipResetRef.current = true;
    const newData = {
      investor: parentData.original.investor,
      id: 0,
      amc: 'AFC',
      coa: '',
      currency: 'MYR',
      drcr: '',
      type: 'Rebate',
      setupDate: new Date(),
    };
    add(id, newData);
  }, [add, id, parentData]);

  const removeData = useCallback(
    rowId => {
      skipResetRef.current = true;
      update(id, rowId, 'type', 'deleted');
    },
    [update, id]
  );

  const updateData = useCallback(
    (rowId, columnId, value) => {
      skipResetRef.current = true;
      update(id, rowId, columnId, value);
    },
    [update, id]
  );

  const refreshData = useCallback(() => {
    skipResetRef.current = true;
    get(id);
  }, [get, id]);

  useEffect(() => {
    skipResetRef.current = false;
  }, [data]);

  return data.cata({
    Success: data => {
      const d = filter(r => r.type !== 'deleted');
      return (
        <>
          <Tr>
            <Td colSpan={parentVisibleColumns.length}>
              <SubRow
                data={d(data)}
                addData={addData}
                updateData={updateData}
                removeData={removeData}
                refreshData={refreshData}
                skipReset={skipResetRef.current}
              />
            </Td>
          </Tr>
        </>
      );
    },
    Failure: err => <Error column={parentVisibleColumns} error={err} />,
    Loading: () => <Loading column={parentVisibleColumns} />,
    NotAsked: () => <Loading column={parentVisibleColumns} />,
  });
};

export default memo(SubTable);
