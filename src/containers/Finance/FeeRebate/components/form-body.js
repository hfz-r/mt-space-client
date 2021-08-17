import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Icon,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoAnalyticsSharp, IoCashSharp } from 'react-icons/io5';
import { FormGeneral } from './form-general';
import { FormCoa } from './form-coa';

const ButtonTitle = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

const AccordionContainer = ({ buttonTitle, children }) => {
  return (
    <AccordionItem
      bgColor={useColorModeValue('gray.50', 'gray.800')}
      fontSize={'sm'}
      border={0}
      boxShadow={'md'}
      borderRadius={'md'}
    >
      {({ isExpanded }) => (
        <>
          <AccordionButton p={2}>
            {buttonTitle}
            <Spacer />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel p={4} h="100%" w="100%">
            {children}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

export const FormBody = props => {
  return (
    <Stack
      as={Accordion}
      defaultIndex={[0]}
      allowMultiple
      direction={'column'}
      borderRadius={'md'}
      w={'100%'}
    >
      <AccordionContainer
        buttonTitle={
          <ButtonTitle
            icon={
              <Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />
            }
            iconBg={useColorModeValue('yellow.100', 'yellow.900')}
            text={'General'}
          />
        }
      >
        <FormGeneral {...props} />
      </AccordionContainer>

      <AccordionContainer
        buttonTitle={
          <ButtonTitle
            icon={<Icon as={IoCashSharp} color={'green.500'} w={5} h={5} />}
            iconBg={useColorModeValue('green.100', 'green.900')}
            text={'COA'}
          />
        }
      >
        <FormCoa {...props} />
      </AccordionContainer>
    </Stack>
  );
};
