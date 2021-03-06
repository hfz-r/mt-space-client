import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { curry, filter, find, map, propEq } from 'ramda';
import { actions } from 'stores';
import { data, DEFAULT_SIZE } from 'utils/base-data';

const FeeRebate = React.lazy(() => import('containers/Finance/FeeRebate/index_'));
const CimbSplit = React.lazy(() => import('containers/Finance/Cimb'));
const contents = { CimbSplit, FeeRebate };

const useBaseData = (path, label) => {
  const [config, setConfig] = useState({});
  const dispatch = useDispatch();

  const currentConfig = useMemo(
    () =>
      curry((label, path, src) => {
        const finance = find(propEq('label', label))(src);
        const getChild = filter(d => d.href.includes(path));
        return {
          parent: finance.label,
          child: map(d => {
            const newHref = d.href.replace('$', finance.baseHref);
            return {
              name: d.label,
              href: newHref,
              viewHref: `${newHref}/view`,
              content: contents[d.filename],
            };
          })(getChild(finance.children)),
        };
      }),
    []
  );

  const fetchData = useCallback(
    ({ size }) => {
      dispatch(actions.investor.fetchRebates({ size }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (path) {
      const conf = currentConfig(label, `/${path}`)(data);
      setConfig(conf);
    }
  }, [currentConfig, label, path]);

  useEffect(() => {
    switch (path) {
      case 'sunsys-coa-setup':
        dispatch(actions.investor.fetchRebates({ size: DEFAULT_SIZE }));
        break;
      case 'cimb-split':
        break;
      default:
        break;
    }
  }, [path, dispatch]);

  return { config, fetchData };
};

export default useBaseData;
