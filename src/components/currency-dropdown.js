import React, { useState } from 'react';
import { Select } from '@chakra-ui/react';
import { map, pick, pipe, toPairs } from 'ramda';
import { currencySymbolMap } from 'utils/currency-symbol-map';

export default function CurrencyDropdown({ initialValue, ...rest }) {
  const [value, setValue] = useState(initialValue || '');
  return (
    <Select value={value} onChange={e => setValue(e.target.value)} {...rest}>
      {map(m => (
        <option key={m[0]} value={m[0]}>
          {m[0]} ({m[1]})
        </option>
      ))(
        pipe(
          pick(['AUD', 'EUR', 'GBP', 'MYR', 'SGD', 'USD']),
          toPairs
        )(currencySymbolMap)
      )}
    </Select>
  );
}
