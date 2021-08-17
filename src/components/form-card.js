import React from 'react';
import {
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Tag,
  Box,
  Link,
  Image,
} from '@chakra-ui/react';
import { Link as NavLink } from 'react-router-dom';
import { usePalette } from 'react-palette';

const FormCard = ({ name, description, image, link, type }) => {
  const { data } = usePalette(image);

  const colorScheme = type => {
    let color;
    switch (type) {
      case 'Setup':
        color = 'blue';
        break;
      case 'SunSystem':
        color = 'orange';
        break;
      default:
        color = 'teal';
        break;
    }
    return color;
  };

  return (
    <Link as={NavLink} to={link}>
      <HStack
        p={4}
        bg={useColorModeValue('white', 'gray.800')}
        rounded="xl"
        borderWidth="1px"
        borderColor={useColorModeValue('gray.100', 'gray.700')}
        w="100%"
        h="100%"
        textAlign="left"
        align="start"
        spacing={4}
        transition="all 0.25s"
        transition-timing-function="spring(1 100 10 10)"
        _hover={{ transform: 'translateY(-4px)', shadow: 'sm' }}
      >
        <Box
          rounded="lg"
          p={2}
          position="relative"
          overflow="hidden"
          lineHeight={0}
          boxShadow="inset 0 0 1px 1px rgba(0, 0, 0, 0.04)"
        >
          <Box
            bg={data.lightVibrant}
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            opacity={0.25}
          ></Box>
          <Image
            src={image ? image : '/'}
            htmlHeight={36}
            htmlWidth={36}
            maxH={120}
            maxW={120}
            layout="fixed"
            rounded="md"
          ></Image>
        </Box>
        <VStack align="start" justify="flex-start" spacing={1}>
          <VStack spacing={0} align="start">
            <HStack>
              <Text fontWeight="bold" fontSize="md" noOfLines={2}>
                {name}
              </Text>
              <Tag size="sm" colorScheme={colorScheme(type)}>
                {type}
              </Tag>
            </HStack>
            <Text
              fontSize="sm"
              color={useColorModeValue('gray.500', 'gray.200')}
            >
              {description}
            </Text>
          </VStack>
        </VStack>
      </HStack>
    </Link>
  );
};

export default FormCard;
