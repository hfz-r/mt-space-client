import React, { forwardRef, useState } from 'react';
import { useWatch } from 'react-hook-form';
import {
  Button,
  ButtonGroup,
  IconButton,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  GridItem,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import CurrencyDropdown from './currency-dropdown';

const baseProps = {
  variant: 'filled',
  shadow: 'sm',
  w: 'full',
  size: 'sm',
  rounded: 'md',
};

const BaseForm = ({ id, label, children }) => (
  <FormControl as={GridItem} colSpan={[6, 3]}>
    <FormLabel
      fontSize="xs"
      fontWeight="md"
      htmlFor={id}
      color={useColorModeValue('gray.700', 'gray.50')}
    >
      {label}
    </FormLabel>
    {children}
  </FormControl>
);

// const FieldRefInput = forwardRef((props, ref) => (
//   <Input ref={ref} {...props} />
// ));

export const CoaInfo = ({
  fieldRef,
  onClose,
  onCancel,
  index,
  control,
  getValues,
  setValue,
  register,
}) => {
  return (
    <Stack spacing={4} my={3} w={'full'}>
      <SimpleGrid columns={6} spacing={6}>
        <BaseForm id={`coa.${index}`} label={'COA'}>
          <Input
            id={`coa.${index}`}
            placeholder="COA"
            defaultValue={getValues(`coas.${index}.coa`)}
            {...register(`coas.${index}.coa`)}
            {...baseProps}
          />
          {/* <FieldRefInput
            ref={fieldRef}
            id={`coa.${index}`}
            {...register(`coas.${index}.coa`)}
            defaultValue={getValues(`coas.${index}.coa`)}
            placeholder="COA"
            {...baseProps}
          /> */}
        </BaseForm>

        <BaseForm id={`type.${index}`} label={'Type'}>
          <Input
            id={`type.${index}`}
            {...register(`coas.${index}.type`)}
            defaultValue={getValues(`coas.${index}.type`)}
            placeholder="COA type"
            {...baseProps}
          />
        </BaseForm>

        <BaseForm id={`currency.${index}`} label={'Currency'}>
          <CurrencyDropdown
            size="sm"
            variant="filled"
            {...register(`coas.${index}.currency`)}
          />
        </BaseForm>

        <BaseForm id={`amc.${index}`} label={'AMC'}>
          <Input
            id={`amc.${index}`}
            {...register(`coas.${index}.amc`)}
            defaultValue={getValues(`coas.${index}.amc`)}
            placeholder="AMC"
            {...baseProps}
          />
        </BaseForm>

        <BaseForm id={`channel.${index}`} label={'Channel'}>
          <Input
            id={`channel.${index}`}
            {...register(`coas.${index}.channel`)}
            defaultValue={getValues(`coas.${index}.channel`)}
            placeholder="Channel"
            {...baseProps}
          />
        </BaseForm>

        <BaseForm id={`agent.${index}`} label={'Agent'}>
          <Input
            id={`agent.${index}`}
            {...register(`coas.${index}.agent`)}
            defaultValue={getValues(`coas.${index}.agent`)}
            placeholder="Agent"
            {...baseProps}
          />
        </BaseForm>

        <BaseForm id={`plan.${index}`} label={'Plan'}>
          <Input
            id={`plan.${index}`}
            {...register(`coas.${index}.plan`)}
            defaultValue={getValues(`coas.${index}.plan`)}
            placeholder="Plan"
            {...baseProps}
          />
        </BaseForm>

        <BaseForm id={`drcr.${index}`} label={'Dr/Cr'}>
          <Input
            id={`drcr.${index}`}
            {...register(`coas.${index}.drcr`)}
            defaultValue={getValues(`coas.${index}.drcr`)}
            placeholder="Dr/Cr"
            {...baseProps}
          />
        </BaseForm>
      </SimpleGrid>
    </Stack>
  );
};
