import React from 'react';
import {
  VStack,
  Text,
  UnorderedList,
  ListItem,
  Heading,
  Link,
} from '@chakra-ui/react';
import PageTransition from 'components/page-transitions';
import Section from 'components/section';

const About = () => (
  <PageTransition>
    <VStack spacing={8}>
      <Section>
        <VStack align="start">
          <Heading as="h1">About</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam
            metus, tempor sed egestas quis, laoreet a velit. Vivamus mauris
            ipsum, elementum eget placerat non,{' '}
            <Link variant="text" href="#" isExternal>
              commodo vel urna
            </Link>
            . Duis vehicula turpis a quam condimentum faucibus. Sed scelerisque
            pharetra dui ut volutpat. Ut tristique scelerisque sem, et dictum
            lorem rutrum ac.
          </Text>
        </VStack>
      </Section>
      <Section>
        <VStack align="stretch" spacing={4}>
          <Heading as="h3" size="lg">
            Objective
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            tempus.
          </Text>
          <UnorderedList fontSize={'sm'} pl={10}>
            <ListItem>Lorem ipsum dolor sit amet</ListItem>
            <ListItem>Consectetur adipiscing elit</ListItem>
            <ListItem>
              Integer molestie lorem at{' '}
              <Link variant="text" href="#" isExternal>
                massa
              </Link>
            </ListItem>
            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
          </UnorderedList>
        </VStack>
      </Section>
    </VStack>
  </PageTransition>
);

export default About;
