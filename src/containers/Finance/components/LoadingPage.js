import { Box, Skeleton } from '@chakra-ui/react';

export default function Loading() {
  return (
    <>
      <Box p={3} boxShadow="md">
        <Skeleton height="200px" />
      </Box>
    </>
  );
}
