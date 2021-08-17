import {
  Box,
  IconButton,
  Text,
  HStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as NavLink } from 'react-router-dom';
import { HiExternalLink, HiSave } from 'react-icons/hi';
import PageTransition from 'components/page-transitions';
import IconButtonAdd from './FeeRebate/Add';
import { DataSample } from './components';

const TABS = [
  { tab: 'All records', tooltip: null },
  { tab: 'Data source', tooltip: 'Data source sample (up to 10 records)' },
];

const Template = props => {
  const { colorMode } = useColorMode();
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
            {TABS.map(({ tab, tooltip }) => (
              <Tab
                key={tab}
                fontSize={'xs'}
                fontWeight={400}
                _selected={{
                  bg: colorMode === 'light' ? 'blue.50' : 'blue.900',
                  color: colorMode === 'light' ? 'blue.500' : 'blue.400',
                }}
                aria-label={tooltip}
                title={tooltip}
              >
                {tab}
              </Tab>
            ))}
            <IconButtonAdd
              cursor={'pointer'}
              size={'sm'}
              variant={'ghost'}
              aria-label={'Create new record'}
              title={'Create new record'}
            />
            <IconButton
              cursor={'pointer'}
              icon={<HiSave />}
              size={'sm'}
              variant={'ghost'}
              aria-label={'Save all changes'}
              title={'Save all changes'}
            />
            <IconButton
              as={NavLink}
              to={props.viewHref}
              cursor={'pointer'}
              icon={<HiExternalLink />}
              size={'sm'}
              variant={'ghost'}
              aria-label={'Open in Fullscreen'}
              title={'Open in Fullscreen'}
              target="_blank"
            />
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
