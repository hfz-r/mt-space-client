import React, { useEffect, useState } from 'react';
import { Input, useColorMode } from '@chakra-ui/react';
import CurrencyDropdown from './currency-dropdown';

export default function EditableCell({
  value: initialValue,
  row: { values },
  column: { id },
  updateData,
  editable,
}) {
  const { colorMode } = useColorMode();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return id !== 'currency' ? (
    <Input
      size="xs"
      disabled={!editable}
      type={'text'}
      value={value}
      color={colorMode === 'light' ? 'gray.800' : 'gray.200'}
      bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
      border={0}
      _focus={{
        bg: colorMode === 'light' ? 'gray.200' : 'gray.800',
        outline: 'none',
      }}
      onChange={e => setValue(e.target.value)}
      onBlur={() => updateData(values.id, id, value)}
    />
  ) : (
    <CurrencyDropdown
      size="xs"
      disabled={!editable}
      variant="filled"
      color={colorMode === 'light' ? 'gray.800' : 'gray.200'}
      bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
      value={value}
      onChange={e => {
        setValue(e.target.value);
        updateData(values.id, id, e.target.value);
      }}
      onBlur={() => updateData(values.id, id, value)}
    />
  );
}
