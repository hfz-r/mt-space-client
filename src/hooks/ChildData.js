import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'stores';

const useRebate = id => {
  const memoizeData = useMemo(() => selectors.investor.makeSelectRebate_, []);
  return useSelector(state => memoizeData(state, id));
};

const useChildData = id => {
  const data = useRebate(id);
  const dispatch = useDispatch();

  const getData = useCallback(
    id => {
      dispatch(actions.investor.getRebate({ parent: id }));
    },
    [dispatch]
  );

  const addData = useCallback(
    (id, payload) => {
      dispatch(actions.investor.addRebate({ parent: id, newChild: payload }));
    },
    [dispatch]
  );

  const removeData = useCallback(
    id => {
      dispatch(actions.investor.removeRebate({ parent: id }));
    },
    [dispatch]
  );

  const updateData = useCallback(
    (id, rid, cid, val) => {
      dispatch(
        actions.investor.updateRebate({
          parent: id,
          rowId: rid,
          columnId: cid,
          value: val,
        })
      );
    },
    [dispatch]
  );

  const { busy, error } = data.cata({
    Success: () => ({ error: null, busy: false }),
    Failure: val => ({ error: val.error, busy: false }),
    Loading: () => ({ error: null, busy: true }),
    NotAsked: () => ({ error: null, busy: false }),
  });

  return {
    busy,
    error,
    data,
    getData,
    addData,
    removeData,
    updateData,
  };
};

export default useChildData;
