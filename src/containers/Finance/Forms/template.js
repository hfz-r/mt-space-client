import React, { useRef } from 'react';
import { Flex, Heading, VStack } from '@chakra-ui/react';
import PageTransition from 'components/page-transitions';
import Container from 'components/container';
import ReadingProgress from 'components/reading-progress';

const Layout = props => {
  const targetRef = useRef(0);

  return (
    <PageTransition>
      <>
        <Container maxW="7xl">
          <main ref={targetRef}>
            <VStack w="100%" align="left">
              <Heading as="h3" size="lg">
                {props.Name}
              </Heading>
            </VStack>
            <Flex mt={5}>{props.children}</Flex>
          </main>
        </Container>
        <ReadingProgress target={targetRef} />
      </>
    </PageTransition>
  );
};

export default Layout;
