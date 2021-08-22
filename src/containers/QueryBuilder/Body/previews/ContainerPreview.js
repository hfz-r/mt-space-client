import React from 'react';
import { Box } from '@chakra-ui/react';
import useInteractive from 'hooks/Interactive';
import useDropComponent from 'hooks/DropComponent';
import ComponentPreview from '../ComponentPreview';

const ContainerPreview = ({ component }) => {
  const { drop, isOver } = useDropComponent(component.id);
  const { props, ref } = useInteractive(component, true);

  if (isOver) {
    props.bg = 'teal.50';
  }

  return (
    <Box pos="relative" ref={drop(ref)} {...props}>
      {component.children.map((key) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </Box>
  );
};

export default ContainerPreview;
