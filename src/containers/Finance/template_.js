import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Divider,
  IconButton,
  Flex,
  HStack,
  Select,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as NavLink } from 'react-router-dom';
import { IoOpen, IoSave } from 'react-icons/io5';
import { actions, selectors } from 'stores';
import PageTransition from 'components/page-transitions';
import IconButtonAdd from './FeeRebate/Add';
import { DataSample } from './components';

const TABS = [
  { tab: 'All records', tooltip: 'Showing $cnt records' },
  { tab: 'Data source', tooltip: 'Data source sample (up to 10 records)' },
];

const useRebates = () => {
  const data = useSelector(selectors.investor.selectRebates);
  const { rebates } = data.getOrElse({});
  return rebates ? rebates.length : 0;
};

const Template = props => {
  const count = useRebates();
  const dispatch = useDispatch();
  const [size, setSize] = useState(100);
  const { colorMode } = useColorMode();

  const tabProps = {
    fontSize: 'xs',
    fontWeight: 400,
    _selected: {
      bg: colorMode === 'light' ? 'blue.50' : 'blue.900',
      color: colorMode === 'light' ? 'blue.500' : 'blue.400',
    },
  };

  return (
    <Box
      rounded={'md'}
      borderWidth={1}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      id={props.name}
      height={'full'}
      style={{
        scrollMarginTop: '2rem',
      }}
    >
      <Tabs variant="soft-rounded" colorScheme="blue" size={'sm'}>
        <TabList
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={{ base: 'column', md: 'row' }}
          py={3}
          px={4}
          borderBottomWidth={1}
          borderBottomStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
        >
          <Text
            color={useColorModeValue('gray.800', 'gray.300')}
            fontSize={'md'}
            fontWeight={600}
            mb={{ base: 4, md: 0 }}
          >
            {props.name}
          </Text>
          <HStack spacing={4} color={useColorModeValue('gray.500', 'gray.300')}>
            {TABS.map(({ tab, tooltip }) => {
              const ttip = tooltip.replace('$cnt', count);
              return (
                <Tab key={tab} aria-label={ttip} title={ttip} {...tabProps}>
                  {tab}
                </Tab>
              );
            })}
            <IconButton
              cursor={'pointer'}
              icon={<IoSave />}
              color="green.400"
              rounded="full"
              variant={'ghost'}
              aria-label={'Save all'}
              title={'Save all'}
              onClick={() => dispatch(actions.investor.saveRebate())}
            />
            <IconButtonAdd
              cursor={'pointer'}
              color="red.400"
              rounded="full"
              variant={'ghost'}
              aria-label={'Create new record'}
              title={'Create new record'}
            />
            <IconButton
              as={NavLink}
              to={props.viewHref}
              cursor={'pointer'}
              icon={<IoOpen />}
              color="yellow.500"
              rounded="full"
              variant={'ghost'}
              aria-label={'Open in Fullscreen'}
              title={'Open in Fullscreen'}
              target="_blank"
            />
            <Divider h="30px" orientation="vertical" />
            <Flex align="center">
              <Select
                size="xs"
                variant="filled"
                title="Total rows"
                aria-label="Total rows"
                value={size}
                onChange={e => {
                  setSize(e.target.value);
                  props.fetchData({ size: e.target.value });
                }}
              >
                <option value="all">All</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="500">500</option>
              </Select>
            </Flex>
          </HStack>
        </TabList>
        <TabPanels borderRadius="2xl">
          <TabPanel p={0}>
            <PageTransition>{props.children}</PageTransition>
          </TabPanel>
          <TabPanel p={0}>
            <DataSample />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Template;
