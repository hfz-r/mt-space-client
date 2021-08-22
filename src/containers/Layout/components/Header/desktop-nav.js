import {
  HStack,
  Stack,
  Box,
  Popover,
  PopoverTrigger,
  Link,
  PopoverContent,
  Text,
  Flex,
  Tag,
  TagLabel,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as NavLink } from 'react-router-dom';
import { navConfig } from 'containers/Layout/config';

const colorScheme = type => {
  let color;
  switch (type) {
    case 'Setup':
      color = 'blue';
      break;
    case 'SunSystem':
      color = 'orange';
      break;
    case 'Utils':
      color= 'red';
      break;
    default:
      color = 'teal';
      break;
  }
  return color;
};

const DesktopSubNav = ({ label, subLabel, href, tags }) => (
  <Link
    as={NavLink}
    to={href}
    role={'group'}
    display={'block'}
    p={2}
    rounded={'md'}
    _hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}
  >
    <Stack direction={'row'} align={'center'}>
      <Box>
        <HStack>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'blue.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          {tags.map(t => (
            <Tag
              key={t}
              size={'sm'}
              borderRadius="full"
              variant="solid"
              colorScheme={colorScheme(t)}
            >
              <TagLabel>{t}</TagLabel>
            </Tag>
          ))}
        </HStack>
        <Text fontSize={'sm'}>{subLabel}</Text>
      </Box>
      <Flex
        transition={'all .3s ease'}
        transform={'translateX(-10px)'}
        opacity={0}
        _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
        justify={'flex-end'}
        align={'center'}
        flex={1}
      ></Flex>
    </Stack>
  </Link>
);

export const DesktopNav = props => {
  const { colorMode } = useColorMode();
  return (
    <Stack direction={'row'} spacing={4} {...props}>
      {navConfig.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                //href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={colorMode === 'light' ? 'gray.600' : 'gray.200'}
                _hover={{
                  textDecoration: 'none',
                  color: colorMode === 'light' ? 'gray.800' : 'white',
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={colorMode === 'light' ? 'white' : 'gray.800'}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};
