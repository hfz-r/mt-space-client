import React, { useEffect, useState } from 'react';
import { Input, useColorMode } from '@chakra-ui/react';

export default function EditableCell({
  value: initialValue,
  row: { index },
  column: { id },
  updateData,
  editable,
}) {
  const { colorMode } = useColorMode();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return !editable ? (
    initialValue
  ) : (
    <Input
      size="xs"
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
      onBlur={() => updateData(index, id, value)}
    />
  );
}
