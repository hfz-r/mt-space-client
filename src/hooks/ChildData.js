import { useSelector } from 'react-redux';
import { selectors } from 'stores';

const useChildData = source => {
  const data = useSelector(selectors.investor.selectRebate);

  const { busy, error } = data.cata({
    Success: () => ({ error: null, busy: false }),
    Failure: val => ({ error: val.error, busy: false }),
    Loading: () => ({ error: null, busy: true }),
    NotAsked: () => ({ error: null, busy: false }),
  });

  return { data, busy, error };
};

export default useChildData;
