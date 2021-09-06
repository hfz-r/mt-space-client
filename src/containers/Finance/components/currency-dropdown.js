import React from 'react';
import { Select } from '@chakra-ui/react';
import { map, pick, pipe, toPairs } from 'ramda';
import { currencySymbolMap } from 'utils/currency-symbol-map';

export default function CurrencyDropdown(props) {
  return (
    <Select {...props}>
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
