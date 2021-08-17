import React, { forwardRef, memo } from 'react';
import { Select } from '@chakra-ui/react';
import { map, pick, pipe, toPairs } from 'ramda';
import { currencySymbolMap } from 'utils/currency-symbol-map';

const CurrencyDropdown = forwardRef(
  ({ name, onChange, onBlur, ...rest }, ref) => {
    return (
      <Select
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      >
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
);

export default memo(CurrencyDropdown);
