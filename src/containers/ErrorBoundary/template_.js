import {
  Container,
  Image,
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Error({ error, errorInfo, onClick }) {
  return (
    <Flex align={'center'} justify={'center'} h={'100vh'} w={'full'}>
      <Stack
        as={Container}
        bg={useColorModeValue('gray.50', 'gray.900')}
        rounded={'xl'}
        p={8}
        spacing={6}
        maxW={'lg'}
        align={'center'}
        textAlign={'center'}
      >
        <Image
          w={10}
          h={10}
          objectFit="cover"
          src="/logo-only-affinhwang.png"
          fallbackSrc="https://via.placeholder.com/150"
          alt="affinhwang-am logo"
        />
        <Stack spacing={2}>
          <Heading>{error}</Heading>
          <Text>{errorInfo}</Text>
        </Stack>
        <Flex>
          <Button
            as={'a'}
            colorScheme={'green'}
            rounded={'full'}
            bg={'green.400'}
            onClick={onClick}
            _hover={{ bg: 'green.500' }}
          >
            Take me to the home page
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}
