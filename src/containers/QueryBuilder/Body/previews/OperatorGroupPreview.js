import React from 'react';
import { RadioGroup, Stack } from '@chakra-ui/react';
import useDropComponent from 'hooks/DropComponent';
import useInteractive from 'hooks/Interactive';
import ComponentPreview from '../ComponentPreview';

const OperatorGroupPreview = ({ component }) => {
  const { drop, isOver } = useDropComponent(component.id);
  const { props, ref } = useInteractive(component, true);

  if (isOver) {
    props.bg = 'teal.50';
  }

  return (
    <RadioGroup ref={drop(ref)} {...props}>
      <Stack spacing={4} direction="row">
        {component.children.map(key => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Stack>
    </RadioGroup>
  );
};

export default OperatorGroupPreview;
