import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';

export default function Loading() {
  return (
    <>
      <Box px={2} py={3} boxShadow="md">
        <SkeletonText noOfLines={4} spacing="4" />
        <Skeleton mt={5} height="200px" />
      </Box>
    </>
  );
}
