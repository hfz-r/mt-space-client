import React from 'react';
import { Select } from '@chakra-ui/react';
import { IoChevronDown } from 'react-icons/io5';
import useInteractive from 'hooks/Interactive';

const FieldPreview = ({ component }) => {
  const { props } = useInteractive(component);

  return (
    <Select {...props} icon={<IoChevronDown path="" />}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  );
};

export default FieldPreview;
