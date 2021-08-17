import React from 'react';
import { Stack, Heading, Text } from '@chakra-ui/react';
import useFinanceContext from 'utils/Hooks/BaseData';
import Template from './template_';

const Finance = props => {
  const { computedMatch, ...rest } = props;
  const { type } = computedMatch.params;
  const {
    config: { parent, child },
  } = useFinanceContext(type, 'Finance');

  return (
    <>
      <Stack mb={10}>
        <Heading size={'xl'}>{parent}</Heading>
        {parent?.description ? (
          <Text color={'gray.600'}>{parent?.description}</Text>
        ) : null}
      </Stack>
      <Stack spacing={12}>
        {child &&
          child.map(c => {
            const Component = c.content;
            return (
              <Template key={c.name} {...c}>
                {c.content && <Component {...rest} />}
              </Template>
            );
          })}
      </Stack>
    </>
  );
};

export default Finance;
