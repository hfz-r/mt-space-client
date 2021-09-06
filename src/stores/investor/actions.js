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

// export const fetchRebate = ({ parent }) => ({
//   type: T.FETCH_REBATE,
//   payload: { parent },
// });
export const fetchRebateLoading = ({ parent }) => ({
  type: T.FETCH_REBATE_LOADING,
  payload: { parent },
});
export const fetchRebateSuccess = ({ parent, child }) => ({
  type: T.FETCH_REBATE_SUCCESS,
  payload: { parent, child },
});
export const fetchRebateFailure = ({ parent, error }) => ({
  type: T.FETCH_REBATE_FAILURE,
  payload: { parent, error },
});

export const getRebate = ({ parent }) => ({
  type: T.GET_REBATE,
  payload: { parent },
});
export const addRebate = ({ parent, newChild }) => ({
  type: T.ADD_REBATE,
  payload: { parent, newChild },
});
export const removeRebate = ({ parent }) => ({
  type: T.REMOVE_REBATE,
  payload: { parent },
});
export const updateRebate = ({ parent, rowId, columnId, value }) => ({
  type: T.UPDATE_REBATE,
  payload: { parent, rowId, columnId, value },
});
export const createRebate = ({ coas, investor, setupDate }) => ({
  type: T.CREATE_REBATE,
  payload: { coas, investor, setupDate },
});
export const saveRebate = payload => ({
  type: T.SAVE_REBATE,
  payload,
});
