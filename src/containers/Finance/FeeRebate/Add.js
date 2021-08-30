import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { actions, selectors } from 'stores';
import { FormBody } from './components';

const defaultValues = {
  setupDate: new Date().toISOString().slice(0, 10),
  coas: [
    {
      coa: 'CR',
      type: 'Rebate',
      currency: 'MYR',
      amc: 'AMC',
      drcr: 'C',
    },
  ],
};

const Add = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const busyState = useSelector(selectors.investor.selectRebate);
  const dispatch = useDispatch();

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

  const handleClose = useCallback(() => {
    reset(defaultValues);
    onClose();
  }, [onClose, reset]);

  const onSubmit = useCallback(
    ({ coas, investor, setupDate }) => {
      return new Promise(resolve => {
        setTimeout(() => {
          dispatch(actions.investor.addRebate({ coas, investor, setupDate }));
          handleClose();
          resolve();
        }, 2000);
      });
    },
    [dispatch, handleClose]
  );

  const { busy, error } = busyState.cata({
    Success: () => ({ error: null, busy: false }),
    Failure: val => ({ error: val.error, busy: false }),
    Loading: () => ({ error: null, busy: true }),
    NotAsked: () => ({ error: null, busy: false }),
  });

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
          <DrawerCloseButton
            title="State will be reset to default"
            onClick={handleClose}
          />
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
            <Button
              variant="outline"
              mr={3}
              onClick={() => reset(defaultValues)}
            >
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
