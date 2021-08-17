import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { HiDocumentAdd } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
// import FocusLock from 'react-focus-lock';
import { FormBody } from './components';

const defaultValues = {
  setupDate: new Date().toISOString().slice(0, 10),
  coas: [
    {
      coa: 'CR*',
      type: 'Rebate',
      currency: 'MYR',
      amc: 'AMC',
      channel: 'Channel',
      agent: 'Agent',
      plan: 'PLAN',
      drcr: 'C',
    },
  ],
};

const Add = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    control,
    handleSubmit,
    register,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  const formProps = {
    control,
    errors,
    register,
    getValues,
    setValue,
    watch,
    defaultValues,
  };

  const onSubmit = values => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(values);
        resolve();
      }, 1000);
    });
  };

  return (
    <>
      <IconButton
        {...props}
        icon={isOpen ? <IoClose /> : <HiDocumentAdd />}
        onClick={onOpen}
      />

      <Drawer
        size="lg"
        isOpen={isOpen}
        placement="left"
        autoFocus={false}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue('white', 'gray.900')}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {'New Fee Rebate'}
          </DrawerHeader>

          <DrawerBody>
            {/* <FocusLock group="coafr-form" returnFocus> */}
            <form id="coafr-form" onSubmit={handleSubmit(onSubmit)}>
              <FormBody {...formProps} />
            </form>
            {/* </FocusLock> */}
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={() => reset(defaultValues)}>
              Reset
            </Button>
            <Button
              type="submit"
              form="coafr-form"
              isLoading={isSubmitting}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Add;
