import React from 'react';
import { Box } from '@chakra-ui/react';
import useInteractive from 'hooks/Interactive';

const PreviewContainer = ({
  component,
  type,
  enableVisualHelper,
  isBoxWrapped,
  ...forwardedProps
}) => {
  const { props, ref } = useInteractive(component, enableVisualHelper);

  const children = React.createElement(type, {
    ...props,
    ...forwardedProps,
    ref,
  });

  if (isBoxWrapped) {
    let boxProps = {};

    return (
      <Box {...boxProps} ref={ref}>
        {children}
      </Box>
    );
  }

  return children;
};

export default PreviewContainer;
