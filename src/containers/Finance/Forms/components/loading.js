import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';
import { LoadingProgress } from 'containers/Progress';

export default function Loading() {
  return (
    <>
      {/* <LoadingProgress /> */}
      <Box w="full">
        <SkeletonText noOfLines={3} spacing="4" />
        <Skeleton mt={8} height="200px" />
      </Box>
    </>
  );
}
