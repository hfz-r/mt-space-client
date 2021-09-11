import React, { useCallback, useEffect } from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  GridItem,
  SimpleGrid,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import InvestorField from './field-investor';

export const FormGeneral = ({ control, errors, register, setValue, watch }) => {
  // const handleChange = useCallback(
  //   val => setValue('investor', val),
  //   [setValue]
  // );

  // useEffect(() => {
  //   register('investor', { required: 'This is required' });
  // }, [register]);

  return (
    <>
      <Stack
        px={4}
        pb={5}
        bg={useColorModeValue('gray.50', 'gray.800')}
        spacing={6}
      >
        <SimpleGrid columns={6} spacing={6}>
          <FormControl
            as={GridItem}
            colSpan={[6, 3]}
            isInvalid={errors.investor}
          >
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              htmlFor="investor"
              color={useColorModeValue('gray.700', 'gray.50')}
            >
              {'Investor'}
            </FormLabel>
            <InvestorField
              id="investor"
              placeholder="Investor name"
              variant="filled"
              shadow="sm"
              w="full"
              rounded="md"
              {...{ control }}
              //onChange={handleChange}
            />
            <FormErrorMessage>
              {errors.investor && errors.investor.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            as={GridItem}
            colSpan={[6, 3]}
            isInvalid={errors.setupDate}
          >
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              htmlFor="setupDate"
              color={useColorModeValue('gray.700', 'gray.50')}
            >
              {'Setup date'}
            </FormLabel>
            <Input
              id="setupDate"
              type="date"
              placeholder="Setup date"
              variant="filled"
              shadow="sm"
              w="full"
              rounded="md"
              {...register('setupDate', {
                required: 'This is required',
                valueAsDate: { message: 'Wrong date format' },
              })}
            />
            <FormErrorMessage>
              {errors.setupDate && errors.setupDate.message}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>
      </Stack>
    </>
  );
};
