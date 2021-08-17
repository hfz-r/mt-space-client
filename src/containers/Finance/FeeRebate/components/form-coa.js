import React, { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Icon,
  InputGroup,
  IconButton,
  Input,
  InputLeftElement,
  GridItem,
  SimpleGrid,
  Stack,
  chakra,
  HStack,
  VStack,
  Heading,
  Link,
  Image,
  Text,
  CloseButton,
  Select,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaWrench, FaTrashAlt } from 'react-icons/fa';
import FieldComponents from '../CoaFields/field-components';
import CoaPopover from '../CoaFields/popover-coa';
import CurrencyDropdown from '../CoaFields/currency-dropdown';

export const FormCoa = ({
  control,
  errors,
  register,
  getValues,
  setValue,
  watch,
  defaultValues,
}) => {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'coas',
  });

  const watchFields = watch('coas');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFields[index],
    };
  });

  //console.log('updated', controlledFields);

  return (
    <>
      <Box px={4} textAlign="right">
        <chakra.button
          type="button"
          bg="gray.900"
          fontSize="xs"
          fontWeight="bold"
          color="white"
          px={2}
          py={1}
          rounded="lg"
          textTransform="uppercase"
          _hover={{
            bg: useColorModeValue('gray.800', 'gray.600'),
          }}
          onClick={() => append(...defaultValues.coas)}
        >
          💥 Add
        </chakra.button>
      </Box>
      <Stack
        px={4}
        py={5}
        spacing={6}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <SimpleGrid columns={6} spacing={6}>
          {controlledFields.map((field, index) => (
            <GridItem key={index} colSpan={[6, 3]}>
              <Box
                maxW="xs"
                mx="auto"
                bg={colorMode === 'light' ? 'white' : 'gray.900'}
                shadow="lg"
                rounded="lg"
              >
                <Flex
                  alignItems="center"
                  justifyContent="flex-end"
                  pt={1}
                  px={1}
                  spacing={1}
                >
                  <CoaPopover
                    index={index}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    {...{ control, getValues, setValue, register }}
                  />

                  <IconButton
                    isRound
                    size="xs"
                    color="red.600"
                    variant="ghost"
                    title="Remove"
                    aria-label="Remove"
                    icon={<FaTrashAlt />}
                    onClick={() => remove(index)}
                  />
                </Flex>
                <Box px={4} pb={4}>
                  <Editable
                    fontWeight="bold"
                    fontSize="2xl"
                    textTransform="uppercase"
                    color={colorMode === 'light' ? 'gray.800' : 'white'}
                    defaultValue={getValues(`coas.${index}.coa`)}
                    value={field.coa ? getValues(`coas.${index}.coa`) : ''}
                    onChange={val => setValue(`coas.${index}.coa`, val)}
                  >
                    <EditablePreview
                      title="Editable field"
                      aria-label="Editable field"
                    />
                    <EditableInput pl={1} />
                  </Editable>

                  <Input
                    my={3}
                    size={'sm'}
                    variant={'filled'}
                    placeholder="Type"
                    value={field.coa ? getValues(`coas.${index}.type`) : ''}
                    onChange={e =>
                      setValue(`coas.${index}.type`, e.target.value)
                    }
                  />

                  <CurrencyDropdown
                    size="sm"
                    variant="filled"
                    value={
                      field.currency ? getValues(`coas.${index}.currency`) : ''
                    }
                    onChange={e => {
                      setValue(`coas.${index}.currency`, e.target.value);
                    }}
                  />
                </Box>
              </Box>
            </GridItem>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};
