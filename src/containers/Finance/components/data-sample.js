import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { slice } from 'ramda';
import { Box, Button, useClipboard } from '@chakra-ui/react';
import { selectors } from 'stores';
import Highlight from 'components/highlight';
import { Error, Loading } from '../Forms/components';

const useData = () => {
  const memoizeData = useMemo(() => selectors.investor.selectRebates, []);
  return useSelector(state => memoizeData(state));
};

const DataSample = () => {
  const memoizeData = useData();
  const { hasCopied, onCopy } = useClipboard(
    JSON.stringify(memoizeData.getOrElse({}), null, 3)
  );

  return memoizeData.cata({
    Success: ({ rebates }) => {
      const sliced = slice(0, 10, rebates);
      return (
        <Box position="relative">
          <Button
            size="sm"
            position="absolute"
            top={4}
            right={8}
            onClick={onCopy}
          >
            {hasCopied ? 'Copied 👌' : 'Copy'}
          </Button>
          <Highlight
            codeString={JSON.stringify(sliced, null, 3)}
            language={'json'}
            showLines={true}
          />
        </Box>
      );
    },
    Failure: err => <Error message={err} />,
    Loading: () => <Loading />,
    NotAsked: () => <Loading />,
  });
};

export default memo(DataSample);
