import { useHistory } from 'react-router-dom';
import { Center, Heading, Link, VStack, Text } from '@chakra-ui/react';
import Container from 'components/container';

export default function Error({ message }) {
  const { status } = message;
  const history = useHistory();

  return (
    <Container my="10">
      <Center>
        <VStack>
          <Heading color={'red'}>Internal error</Heading>
          <Text align={'center'} mb={8}>
            {status
              ? status
              : 'Failing to fetch data from the server (offline) could be the caused. Please refresh. If the problem persisted, do contact the admin.'}
          </Text>
          <Link color="teal.500" onClick={() => history.go(0)}>
            Refresh
          </Link>
        </VStack>
      </Center>
    </Container>
  );
}
