import * as T from './constants';

export const fetchRebates = request => ({
  type: T.FETCH_REBATES,
  payload: request || {},
});
export const fetchRebatesLoading = () => ({
  type: T.FETCH_REBATES_LOADING,
});
export const fetchRebatesSuccess = data => ({
  type: T.FETCH_REBATES_SUCCESS,
  payload: data,
});
export const fetchRebatesFailure = data => ({
  type: T.FETCH_REBATES_FAILURE,
  payload: data,
});

export const addRebate = ({ coas, investor, setupDate }) => ({
  type: T.ADD_REBATE,
  payload: { coas, investor, setupDate },
});
export const addRebateLoading = () => ({
  type: T.ADD_REBATE_LOADING,
});
export const addRebateSuccess = data => ({
  type: T.ADD_REBATE_SUCCESS,
  payload: data,
});
export const addRebateFailure = data => ({
  type: T.ADD_REBATE_FAILURE,
  payload: data,
});

export const updateTable = ({ parentId, childData }) => ({
  type: T.UPDATE_TABLE,
  payload: { parentId, childData },
});
export const removeTable = ({ parentId, rowIndex }) => ({
  type: T.REMOVE_TABLE,
  payload: { parentId, rowIndex },
});
export const refreshTable = ({ parentId }) => ({
  type: T.REFRESH_TABLE,
  payload: { parentId },
});
export const persistTable = data => ({
  type: T.PERSIST_TABLE,
  payload: data,
});
