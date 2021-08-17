import React, { useMemo, useState } from 'react';
import { chakra, useToast } from '@chakra-ui/react';
import { map, path } from 'ramda';

const Toast = props => {
  const { payload, ...rest } = props;
  const [body, setBody] = useState([]);
  const toast = useToast();

  useMemo(() => {
    const data = map(p => ({
      investor: path(['investor', 'investorId'])(p.original),
      coa: path(['coa'])(p.original),
    }))(payload);
    setBody(data);
  }, [payload]);

  return (
    <chakra.pre p={5}>
      <code>
        {JSON.stringify(
          {
            'selectedFlatRows[].original': payload.map(d => d.original),
          },
          null,
          2
        )}
        {/* {console.log(
          map(d =>
            map(x => ({ investor: x }))(
              paths([['investor', 'investorId'], ['coa']])(d.original)
            )
          )(payload)
        )} */}
        {/* {console.log(
          map(p => ({
            investor: path(['investor', 'investorId'])(p.original),
            coa: path(['coa'])(p.original),
          }))(payload)
        )} */}
        {console.log(body)}
      </code>
    </chakra.pre>
  );
};

export default Toast;
