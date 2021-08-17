import { useEffect, useRef, useState } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';

const MIN_HEIGHT = 500;

export const TableFrame = ({ viewHref }) => {
  const ref = useRef(null);
  const { colorMode } = useColorMode();
  const [height, setHeight] = useState(undefined);

  const syncHeight = () => {
    const frameHeight = ref.current?.contentWindow?.document.body.offsetHeight;
    setHeight(frameHeight);
  };

  // Reload iframe content when theme and colorMode changes
  useEffect(() => {
    ref.current?.contentWindow?.location.reload();
  }, [colorMode]);

  const getHeight = () =>
    height !== undefined && height >= MIN_HEIGHT ? height : MIN_HEIGHT;

  return (
    <Box bg={'gray.500'}>
      <iframe
        title="table"
        src={viewHref}
        loading={'lazy'}
        width={'100%'}
        height={getHeight()}
        onLoad={syncHeight}
        ref={ref}
      />
    </Box>
  );
};
