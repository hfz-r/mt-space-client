import React from 'react';
import { IconButton, ScaleFade, Tooltip, useColorMode } from '@chakra-ui/react';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleClick = () => {
    toggleColorMode();
  };

  return (
    <Tooltip
      label={colorMode === 'dark' ? 'Light mode' : 'Dark mode'}
      aria-label="A tooltip"
    >
      <IconButton
        isRound
        aria-label="Switch theme"
        icon={
          colorMode === 'dark' ? (
            <ScaleFade in>
              <HiOutlineSun size={20} />
            </ScaleFade>
          ) : (
            <ScaleFade in>
              <HiOutlineMoon size={20} />
            </ScaleFade>
          )
        }
        onClick={handleClick}
      />
    </Tooltip>
  );
};

export default ThemeToggle;
