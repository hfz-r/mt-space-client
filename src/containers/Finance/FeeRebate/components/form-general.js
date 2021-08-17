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
import { InvestorField } from '../InvestorFields';

export const FormGeneral = ({ errors, register, setValue, watch }) => {
  useEffect(() => {
    register('investor', { required: true });
  }, [register]);

  const handleChange = useCallback(
    val => setValue('investor', val),
    [setValue]
  );

  return (
    <>
      <InvestorField onChange={handleChange} />
      {/* other fields */}
      <Stack
        px={4}
        py={5}
        bg={useColorModeValue('gray.50', 'gray.800')}
        spacing={6}
      >
        <SimpleGrid columns={6} spacing={6}>
          <FormControl
            as={GridItem}
            colSpan={[6, 3]}
            isInvalid={errors.setupType}
          >
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              htmlFor="setupType"
              color={useColorModeValue('gray.700', 'gray.50')}
            >
              {'Setup type'}
            </FormLabel>
            <Input
              id="setupType"
              placeholder="Setup type"
              variant="filled"
              shadow="sm"
              w="full"
              rounded="md"
              {...register('setupType')}
            />
          </FormControl>

          <FormControl
            as={GridItem}
            colSpan={[6, 3]}
            isInvalid={errors.setupBy}
          >
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              htmlFor="setupBy"
              color={useColorModeValue('gray.700', 'gray.50')}
            >
              {'Setup by'}
            </FormLabel>
            <Input
              id="setupBy"
              placeholder="Setup by"
              variant="filled"
              shadow="sm"
              w="full"
              rounded="md"
              {...register('setupBy')}
            />
          </FormControl>

          <FormControl
            as={GridItem}
            colSpan={[6, 4]}
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
