import React, { useCallback } from 'react';
import {
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useWatch } from 'react-hook-form';

const FieldComponents = ({ name, control, register, isHeader, onChange }) => {
  const value = useWatch({
    control,
    name,
  });

  const BaseField = () => (
    <Editable defaultValue={value}>
      <EditablePreview
        textDecoration="none"
        title="Editable field"
        aria-label="Editable field"
        _hover={{ textDecoration: 'none' }}
      />
      <EditableInput w={'66%'} pl={1} onChange={onChange} />
    </Editable>
  );

  // return (
  //   <Input
  //     size="sm"
  //     colorScheme="blue"
  //     defaultValue={value}
  //     onChange={onChange}
  //   />
  // );
  return isHeader ? (
    <Heading as="h4" size="md" marginTop="1">
      <BaseField />
    </Heading>
  ) : (
    <BaseField />
  );
  // return (
  //   <Editable defaultValue={value}>
  //     <EditablePreview
  //       textDecoration="none"
  //       title="Editable field"
  //       aria-label="Editable field"
  //       _hover={{ textDecoration: 'none' }}
  //     />
  //     <EditableInput w={'66%'} pl={1} onChange={onChange} />
  //   </Editable>
  // );
};

export default FieldComponents;
