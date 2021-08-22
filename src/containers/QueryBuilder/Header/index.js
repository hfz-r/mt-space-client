import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Switch,
  Button,
  Flex,
  Link,
  Stack,
  FormLabel,
  DarkMode,
  FormControl,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  LightMode,
  PopoverFooter,
  Tooltip,
  HStack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoCheckbox, IoClose, IoInformationCircle } from 'react-icons/io5';
import { actions, selectors } from 'stores';
import { HeaderMenu } from './header-menu';

export const Header = () => {
  const { colorMode } = useColorMode();
  const showLayout = useSelector(selectors.queryApp.getShowLayout);
  const showQuery = useSelector(selectors.queryApp.getShowQuery);
  const dispatch = useDispatch();

  return (
    <DarkMode>
      <Flex
        as={'header'}
        pos="fixed"
        top="60px"
        px="1rem"
        w="100%"
        minH={'2.5rem'}
        //boxShadow={'sm'}
        zIndex="100"
        justify={'center'}
        bg={useColorModeValue('gray.50', 'blackAlpha.600')}
        css={{
          backdropFilter: 'saturate(180%) blur(5px)',
        }}
      >
        <Flex flexGrow={1} justifyContent="space-between" alignItems="center">
          <HStack spacing={4} justify="center" align="center">
            {/* <Box>
            <HeaderMenu />
          </Box> */}
            <FormControl flexDirection="row" display="flex" alignItems="center">
              <Tooltip
                zIndex={100}
                hasArrow
                bg="yellow.100"
                aria-label="Builder mode help"
                label="Builder mode adds extra padding/borders"
              >
                <FormLabel
                  cursor="help"
                  color={useColorModeValue('black', 'gray.200')}
                  fontSize="xs"
                  htmlFor="preview"
                  pb={0}
                  mb={0}
                  mr={2}
                  whiteSpace="nowrap"
                >
                  Builder mode
                </FormLabel>
              </Tooltip>
              <LightMode>
                <Switch
                  isChecked={showLayout}
                  colorScheme="teal"
                  size="sm"
                  onChange={() =>
                    dispatch(actions.queryApp.toggleBuilderMode())
                  }
                  id="preview"
                />
              </LightMode>
            </FormControl>

            <FormControl display="flex" flexDirection="row" alignItems="center">
              <FormLabel
                color={useColorModeValue('black', 'gray.200')}
                fontSize="xs"
                mr={2}
                mb={0}
                htmlFor="code"
                pb={0}
                whiteSpace="nowrap"
              >
                Query panel
              </FormLabel>
              <LightMode>
                <Switch
                  isChecked={showQuery}
                  id="code"
                  colorScheme="teal"
                  onChange={() => dispatch(actions.queryApp.toggleQueryPanel())}
                  size="sm"
                />
              </LightMode>
            </FormControl>

            <Stack direction="row">
              <Popover>
                {({ onClose }) => (
                  <>
                    <PopoverTrigger>
                      <Button
                        rightIcon={<IoClose path="" />}
                        size="xs"
                        variant="ghost"
                        color={colorMode === 'light' ? 'black' : 'gray.200'}
                      >
                        Clear
                      </Button>
                    </PopoverTrigger>
                    <LightMode>
                      <PopoverContent zIndex={100}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Are you sure?</PopoverHeader>
                        <PopoverBody fontSize="sm">
                          Do you really want to remove all items on the editor?
                        </PopoverBody>
                        <PopoverFooter display="flex" justifyContent="flex-end">
                          <Button
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            rightIcon={<IoCheckbox path="" />}
                            onClick={() => {
                              dispatch(actions.query.reset());
                              if (onClose) {
                                onClose();
                              }
                            }}
                          >
                            Yes, clear
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </LightMode>
                  </>
                )}
              </Popover>
            </Stack>
          </HStack>
        </Flex>
        <Stack
          justifyContent="flex-end"
          width="13rem"
          align="center"
          direction="row"
          spacing="2"
        >
          <Link isExternal href="#">
            <Box
              as={IoInformationCircle}
              size={22}
              color={useColorModeValue('gray.800', 'blue.300')}
            />
          </Link>
        </Stack>
      </Flex>
    </DarkMode>
  );
};
