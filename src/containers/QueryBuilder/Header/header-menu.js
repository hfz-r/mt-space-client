import React from 'react';
import {
  Box,
  Button,
  LightMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Portal,
} from '@chakra-ui/react';
import { FaChevronDown, FaBomb, FaSave } from 'react-icons/fa';

const MenuItemLink = React.forwardRef((props, ref) => {
  return <MenuItem ref={ref} as="a" {...props} />;
});

const CustomMenuButton = React.forwardRef((props, ref) => {
  return <MenuButton as={Button} {...props} />;
});

export const HeaderMenu = () => {
  return (
    <Menu placement="bottom">
      <CustomMenuButton
        rightIcon={<FaChevronDown path="" />}
        size="xs"
        variant="ghost"
        colorScheme="gray"
      >
        Editor
      </CustomMenuButton>
      <Portal>
        <LightMode>
          <MenuList zIndex={100}>
            <MenuItem>
              <Box mr={2} as={FaSave} />
              Save
            </MenuItem>
            <MenuItemLink href="#">
              <Box mr={2} as={FaBomb} />
              Info
            </MenuItemLink>
          </MenuList>
        </LightMode>
      </Portal>
    </Menu>
  );
};
