import React, { useRef } from 'react';
import {
  Heading,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Stack,
  Text,
  createIcon,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import FocusLock from 'react-focus-lock';
import { InvestorSearch } from './search-investor';

const SearchIcon = createIcon({
  displayName: 'SearchIcon',
  viewBox: '0 0 512 512',
  path: (
    <g id="Search">
      <path
        d="M467.478 247.835H44.522C19.933 247.835 0 227.902 0 203.314V153.37c0-24.588 19.933-44.522 44.522-44.522h422.957c24.588 0 44.522 19.933 44.522 44.522v49.944c-.001 24.588-19.935 44.521-44.523 44.521z"
        fill="#f4eecb"
      />
      <path
        d="M467.478 108.846H44.522C19.933 108.846 0 128.759 0 153.322v50.036c0 24.564 19.933 44.476 44.522 44.476h422.957c24.588 0 44.522-19.912 44.522-44.476v-50.036c-.001-24.562-19.935-44.476-44.523-44.476zm27.826 94.513c0 15.328-12.483 27.797-27.826 27.797H44.522c-15.343 0-27.826-12.469-27.826-27.797v-50.036c0-15.328 12.483-27.797 27.826-27.797h422.957c15.343 0 27.826 12.469 27.826 27.797v50.036z"
        fill="#e2dcbc"
      />
      <path
        d="M64 177.785v1.112c0 4.606-3.738 8.339-8.348 8.339s-8.348-3.733-8.348-8.339v-1.112c0-4.606 3.738-8.339 8.348-8.339S64 173.179 64 177.785zm25.043-8.339c-4.61 0-8.348 3.733-8.348 8.339v1.112c0 4.606 3.738 8.339 8.348 8.339 4.61 0 8.348-3.733 8.348-8.339v-1.112c0-4.606-3.737-8.339-8.348-8.339zm33.392 0c-4.61 0-8.348 3.733-8.348 8.339v1.112c0 4.606 3.738 8.339 8.348 8.339s8.348-3.733 8.348-8.339v-1.112c0-4.606-3.738-8.339-8.348-8.339z"
        fill="#bfbba3"
      />
      <path
        d="M505.48 356.327l-62.963-62.899c-8.693-8.685-22.788-8.685-31.481 0l-25.115-25.089c30.76-45.416 26.02-107.667-14.237-147.882-45.64-45.594-119.638-45.594-165.278 0s-45.64 119.515 0 165.11c40.257 40.215 102.573 44.951 148.034 14.223l25.115 25.089c-8.693 8.684-8.693 22.765 0 31.449l62.964 62.899c8.693 8.684 22.788 8.684 31.481 0l31.481-31.449c8.693-8.686 8.693-22.766-.001-31.451z"
        fill="#84a7b7"
      />
      <path
        d="M385.92 268.34l25.115 25.089-31.481 31.449-25.115-25.089a117.28 117.28 0 0017.244-14.223 117.354 117.354 0 0014.237-17.226z"
        fill="#256277"
      />
      <path
        d="M366.957 203.012c0 42.986-34.883 77.833-77.913 77.833s-77.913-34.847-77.913-77.833 34.883-77.833 77.913-77.833 77.913 34.846 77.913 77.833z"
        fill="#c3e4ed"
      />
      <path
        d="M362.438 176.867l-99.566 99.464c-14.562-5.188-27.13-14.571-36.228-26.707l109.06-108.949c12.148 9.089 21.541 21.644 26.734 36.192zm-47.223-47.175l-99.566 99.464a77.248 77.248 0 004.681 10.557l105.453-105.345a77.606 77.606 0 00-10.568-4.676z"
        fill="#dcf3f9"
      />
      <path
        d="M289.391 144.81c12.295 0 22.261 9.956 22.261 22.239 0 12.281-9.966 22.239-22.261 22.239s-22.261-9.956-22.261-22.239 9.967-22.239 22.261-22.239z"
        fill="#fff"
      />
    </g>
  ),
});

export const InvestorPopover = ({ isOpen, onClose }) => {
  const fieldRef = useRef(null);

  return (
    <Popover
      initialFocusRef={fieldRef}
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom"
      returnFocusOnClose={false}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <chakra.span />
      </PopoverTrigger>
      <PopoverContent
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack
          bg={useColorModeValue('white', 'gray.700')}
          p={3}
          align={'center'}
        >
          <FocusLock group="coafr-form" returnFocus>
            <Icon as={SearchIcon} w={24} h={24} />
            <PopoverHeader border="0">
              <Stack align={'center'} spacing={2}>
                <Heading
                  textTransform={'uppercase'}
                  fontSize={'xl'}
                  color={useColorModeValue('gray.800', 'gray.200')}
                >
                  Search investor
                </Heading>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Search & seek investor!
                </Text>
              </Stack>
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <InvestorSearch
              fieldRef={fieldRef}
              onClose={onClose}
              onCancel={onClose}
            />
          </FocusLock>
        </Stack>
      </PopoverContent>
    </Popover>
  );
};
