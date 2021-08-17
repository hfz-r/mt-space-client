import React from 'react';
import {
  VStack,
  HStack,
  Button,
  Box,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { HiChevronDown } from 'react-icons/hi';
import { FcComboChart , FcMoneyTransfer} from 'react-icons/fc';
import { Link, NavLink, matchPath, useLocation } from 'react-router-dom';
import Container from 'components/container';
import ThemeToggle from 'components/theme-toggle';
import AvatarNavigation from 'components/avatar-navigation';

const HeaderLink = props => {
  const { href, name, ...rest } = props;
  const location = useLocation();

  const match = matchPath(location.pathname, {
    path: href,
    exact: false,
  });

  return (
    <NavLink to={href}>
      <Button
        aria-current={Boolean(match) ? 'page' : undefined}
        _activeLink={{
          color: useColorModeValue('blue.500', 'blue.200'),
        }}
        variant="ghost"
        size="md"
        px={4}
        {...rest}
      >
        {name}
      </Button>
    </NavLink>
  );
};

const Header = () => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      display={{ base: 'none', md: 'block' }}
      position="fixed"
      w="100%"
      zIndex={99}
      borderBottomWidth="2px"
      borderBottomColor={useColorModeValue('gray.100', 'gray.700')}
      shadow="0 0 10px 0 rgba(0,0,0, 0.035);"
    >
      <Container>
        <VStack align="start" spacing={0}>
          <HStack justify="space-between" w="100%" h={16}>
            <AvatarNavigation />
            <HStack ml={-4} spacing={2}>
              <HeaderLink href="/home" name="Home" />
              <HeaderLink href="/about" name="About" />
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  size="md"
                  px={4}
                  rightIcon={<HiChevronDown size={18} />}
                >
                  Forms
                </MenuButton>
                <MenuList>
                  <Link to="/finance">
                    <MenuItem
                      icon={
                        <FcComboChart
                          size={18}
                          color={useColorModeValue('blue.500', 'blue.200')}
                        />
                      }
                    >
                      Finance
                    </MenuItem>
                  </Link>
                  <Link to="/form">
                    <MenuItem
                      icon={
                        <FcMoneyTransfer
                          size={18}
                          color={useColorModeValue('blue.500', 'blue.200')}
                        />
                      }
                    >
                      Investor
                    </MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </HStack>
            <HStack>
              <ThemeToggle />
            </HStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};
export default Header;
