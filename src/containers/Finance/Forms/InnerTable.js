import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  useFlexLayout,
  useResizeColumns,
  useSortBy,
  useTable,
} from 'react-table';
import { assoc, difference, differenceWith, map, remove } from 'ramda';
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
import { actions } from 'stores';
import { ActionButton, EditableCell } from './components';

const SubRow = ({
  originalData,
  childData,
  addData,
  updateData,
  removeData,
  resetData,
  syncChildData,
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
      defaultColumn,
      data: childData,
      updateData,
      autoResetPage: !skipReset,
      disableMultiSort: true,
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
                onClick={e => removeData(row.index)}
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
          <ActionButton
            addData={addData}
            resetData={resetData}
            syncData={syncChildData}
          />
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

const InnerTable = ({ parentVisibleColumns, data }) => {
  const [loading, setLoading] = useState(true);
  const [childData, setChildData] = useState([]);
  const [originalData] = useState(data.original.child);
  const dispatch = useDispatch();
  const skipResetRef = useRef(false);

  const syncChildData = useCallback(() => {
    skipResetRef.current = true;
    const diffd = map(
      c => ({
        ...c,
        ...assoc('type', 'deleted', c),
      }),
      differenceWith((o, c) => o.id === c.id, originalData, childData)
    );
    const diff = difference(childData, originalData);
    const merge = [...diff, ...diffd];
    merge.length > 0 && dispatch(actions.investor.persistTable(merge));
  }, [dispatch, childData, originalData]);

  const addData = useCallback(() => {
    skipResetRef.current = true;
    const newData = {
      investor: childData[0].investor,
      id: 0,
      amc: 'AFC',
      coa: '',
      currency: 'MYR',
      drcr: '',
      type: 'Rebate',
      setupDate: new Date(),
    };
    setChildData([newData, ...childData]);
  }, [childData]);

  const resetData = useCallback(() => {
    skipResetRef.current = true;
    setChildData(originalData);
  }, [originalData]);

  const removeData = useCallback(rowIndex => {
    skipResetRef.current = true;
    setChildData(old => remove(rowIndex, 1, old));
  }, []);

  const updateData = useCallback((rowIndex, columnId, value) => {
    skipResetRef.current = true;
    setChildData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChildData(data.original.child);
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [data, dispatch]);

  useEffect(() => {
    skipResetRef.current = false;
  }, [childData]);

  if (loading) {
    return (
      <Tr>
        <Td colSpan={parentVisibleColumns.length}>
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
  }

  return (
    <>
      <Tr>
        <Td colSpan={parentVisibleColumns.length}>
          <SubRow
            originalData={originalData}
            childData={childData}
            addData={addData}
            updateData={updateData}
            removeData={removeData}
            resetData={resetData}
            syncChildData={syncChildData}
            skipReset={skipResetRef.current}
          />
        </Td>
      </Tr>
    </>
  );
};

export default InnerTable;
