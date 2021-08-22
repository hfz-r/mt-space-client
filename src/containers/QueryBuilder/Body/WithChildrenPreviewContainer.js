import React from 'react';
import { Box } from '@chakra-ui/react';
import useInteractive from 'hooks/Interactive';
import useDropComponent from 'hooks/DropComponent';
import ComponentPreview from './ComponentPreview';

const WithChildrenPreviewContainer = ({
  component,
  type,
  enableVisualHelper = false,
  isBoxWrapped,
  ...forwardedProps
}) => {
  const { drop, isOver } = useDropComponent(component.id);
  const { props, ref } = useInteractive(component, enableVisualHelper);
  const propsElement = { ...props, ...forwardedProps, pos: 'relative' };

  if (!isBoxWrapped) {
    propsElement.ref = drop(ref);
  }

  if (isOver) {
    propsElement.bg = 'teal.50';
  }

  const children = React.createElement(
    type,
    propsElement,
    component.children.map(key => (
      <ComponentPreview key={key} componentName={key} />
    ))
  );

  if (isBoxWrapped) {
    let boxProps = {
      display: 'inline',
    };

    return (
      <Box {...boxProps} ref={drop(ref)}>
        {children}
      </Box>
    );
  }

  return children;
};

export default WithChildrenPreviewContainer;
