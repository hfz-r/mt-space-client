import {
  Container,
  Heading,
  Text,
  Stack,
  Icon,
  SimpleGrid,
  Link,
  Flex,
  useColorMode,
} from '@chakra-ui/react';
import { TextUnderline } from 'components/text-underline';
import {
  IoStar,
  IoExtensionPuzzle,
  IoMedal,
  IoBookmarks,
} from 'react-icons/io5';
import PageTransition from 'components/page-transitions';

export const About = props => {
  const { colorMode } = useColorMode();

  const STAT = [
    {
      icon: IoStar,
      label: 'Achivement one',
      count: 1,
    },
    {
      icon: IoMedal,
      label: 'Achivement two',
      count: 2,
    },
    {
      icon: IoBookmarks,
      label: 'Categories',
      count: props.categoriesCount,
    },
    {
      icon: IoExtensionPuzzle,
      label: 'Forms',
      count: props.formsCount,
    },
  ];

  return (
    <PageTransition>
      <Container maxW={'7xl'} py={{ base: 14, sm: 20, md: 32 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Heading as={'h3'} mb={2}>
              How it will <TextUnderline>help you</TextUnderline>
            </Heading>
            <Text color={'gray.500'} maxW={'4xl'} fontSize={{ md: 'lg' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam
              metus, tempor sed egestas quis, laoreet a velit. Vivamus mauris
              ipsum, elementum eget placerat non,{' '}
              <Link href="#" color={'green.400'} target={'_blank'}>
                commodo vel urna
              </Link>
              Duis vehicula turpis a quam condimentum faucibus. Sed scelerisque
              pharetra dui ut volutpat. Ut tristique scelerisque sem, et dictum
              lorem rutrum ac.
            </Text>
          </Stack>

          <Flex justify={'center'} align={'center'}>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 4 }}
              w={'full'}
            >
              {STAT.map(stat => (
                <Stack
                  key={stat.label}
                  bg={colorMode === 'light' ? 'gray.100' : 'gray.900'}
                  rounded={'xl'}
                  px={4}
                  py={3}
                  direction={'row'}
                  align={'center'}
                  spacing={4}
                  justify={'space-between'}
                >
                  <Stack direction={'row'} align={'center'}>
                    <Icon color={'green.400'} as={stat.icon} />
                    <Text>{stat.label}</Text>
                  </Stack>
                  <Text fontWeight={700}>{stat.count}</Text>
                </Stack>
              ))}
            </SimpleGrid>
          </Flex>
        </SimpleGrid>
      </Container>
    </PageTransition>
  );
};
