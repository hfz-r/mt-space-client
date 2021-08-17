import React from 'react';
import {
  VStack,
  Text,
  Heading,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react';
import PageTransition from 'components/page-transitions';
import Section from 'components/section';
import FormCard from 'components/form-card';
import forms from './config';

const FinanceContainer = () => (
  <PageTransition>
    <VStack spacing={8}>
      <Section>
        <VStack>
          <Heading as="h1">Finance Form</Heading>
          <Text
            fontSize={['xl', '2xl']}
            color={useColorModeValue('gray.500', 'gray.200')}
            maxW="lg"
            textAlign="center"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit..
          </Text>
        </VStack>
      </Section>
      <Section>
        <VStack align="start" spacing={8}>
          <SimpleGrid columns={1} spacing={4} mt={8} w="100%">
            {forms
              .sort(s => s.Name)
              .map(form => (
                <FormCard
                  key={form.Name}
                  name={form.Name}
                  description={form.Description}
                  image={form.Image}
                  type={form.Type}
                  link={form.Link}
                />
              ))}
          </SimpleGrid>
        </VStack>
      </Section>
    </VStack>
  </PageTransition>
);

export default FinanceContainer;
