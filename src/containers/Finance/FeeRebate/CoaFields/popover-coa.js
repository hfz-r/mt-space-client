import React, { memo, useRef } from 'react';
import {
  Heading,
  Icon,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Stack,
  Text,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaWrench } from 'react-icons/fa';
import FocusLock from 'react-focus-lock';
import { CoaInfo } from './info-coa';

const CoaPopover = ({
  index,
  isOpen,
  onClose,
  control,
  getValues,
  setValue,
  register,
}) => {
  const fieldRef = useRef(null);

  return (
    <Popover
      key={index}
      initialFocusRef={fieldRef}
      //isOpen={isOpen}
      //onClose={onClose}
      placement="right"
      returnFocusOnClose={false}
      //closeOnBlur={false}
    >
      <PopoverTrigger>
        {/* <chakra.span /> */}
        <IconButton
          isRound
          size="xs"
          color="whiteAlpha.800"
          variant="ghost"
          title="Setup"
          aria-label="Setup"
          icon={<FaWrench />}
          //onClick={() => setIsOpen(!isOpen)}
        />
      </PopoverTrigger>
      <PopoverContent>
        <Stack
          p={3}
          align={'center'}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.800')}
        >
          {/* <FocusLock group="coafr-form" returnFocus> */}
          <PopoverHeader border="0" mb={2}>
            <Stack align={'center'} spacing={2}>
              <Heading
                textTransform={'uppercase'}
                fontSize={'xl'}
                color={useColorModeValue('gray.800', 'gray.200')}
              >
                COA Setup
              </Heading>
            </Stack>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <CoaInfo
            fieldRef={fieldRef}
            onClose={onClose}
            onCancel={onClose}
            {...{ index, control, getValues, setValue, register }}
          />
          {/* </FocusLock> */}
        </Stack>
      </PopoverContent>
    </Popover>
  );
};

export default CoaPopover;
