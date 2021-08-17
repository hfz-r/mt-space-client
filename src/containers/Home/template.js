import React from 'react';
import {
  Tag,
  Box,
  VStack,
  HStack,
  Text,
  OrderedList,
  ListItem,
  Link,
  Heading,
} from '@chakra-ui/react';
import PageTransition from 'components/page-transitions';
import Section from 'components/section';

const Home = props => (
  <Box>
    <PageTransition>
      <VStack spacing={12}>
        <Section>
          <VStack spacing={4} align="start" fontSize="2xl">
            <Heading size="xl">Hey, Welcome 👋</Heading>
            <VStack align="start">
              <Text>
                <Link
                  variant="text"
                  href="https://www.google.com/search?q=maintainance+meaning"
                  isExternal
                >
                  🔨 maintenance
                </Link>{' '}
                <Text as="kbd">space</Text>
              </Text>
              <Text as="sub"> /ˈmeɪnt(ə)nəns,ˈmeɪntɪnəns/</Text>
              <br />
              <VStack align="start" fontSize="sm">
                <OrderedList>
                  <ListItem>
                    the process of preserving a condition or situation or the
                    state of being preserved.
                  </ListItem>
                  <VStack align="start">
                    <Text as="samp" color="gray.500">
                      "we support local initiatives that ensure the maintenance
                      of community spirit"
                    </Text>
                    <Text color="green.500">Similiar: </Text>
                    <HStack spacing={2}>
                      {[
                        'preservation',
                        'conservation',
                        'continuation',
                        'continuance',
                        'continuity',
                      ].map(tags => (
                        <Tag size={'sm'} key={tags} variant="solid">
                          {tags}
                        </Tag>
                      ))}
                    </HStack>
                  </VStack>
                  <br />
                  <ListItem>
                    financial support provided for a person's living expenses.
                  </ListItem>
                  <VStack align="start">
                    <Text as="samp" color="gray.500">
                      "a chance of going to university with fees and maintenance
                      paid"
                    </Text>
                    <Text color="green.500">Similiar: </Text>
                    <HStack spacing={2}>
                      {[
                        'nurture',
                        'feeding',
                        'life support',
                        'financing',
                        'supporting',
                        'support',
                      ].map(tags => (
                        <Tag size={'sm'} key={tags} variant="solid">
                          {tags}
                        </Tag>
                      ))}
                    </HStack>
                  </VStack>
                </OrderedList>
              </VStack>
            </VStack>
          </VStack>
        </Section>
      </VStack>
    </PageTransition>
  </Box>
);

export default Home;
