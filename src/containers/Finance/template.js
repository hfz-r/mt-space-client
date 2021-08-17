import {
  Box,
  Text,
  HStack,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as NavLink } from 'react-router-dom';
import { HiExternalLink } from 'react-icons/hi';
import { TableFrame } from './components';

const TABS = ['All records', 'New record'];

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
            {TABS.map(tab => (
              <Tab
                key={tab}
                fontSize={'xs'}
                fontWeight={400}
                _selected={{
                  bg: colorMode === 'light' ? 'blue.50' : 'blue.900',
                  color: colorMode === 'light' ? 'blue.500' : 'blue.400',
                }}
              >
                {tab}
              </Tab>
            ))}
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
            <TableFrame viewHref={props.viewHref} />
          </TabPanel>
          <TabPanel p={0}>
            {/* <CodeSample
              category={category}
              subCategory={subCategory}
              template={template}
            /> */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Template;
