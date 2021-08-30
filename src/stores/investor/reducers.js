import produce from 'immer';
import Remote from 'utils/remote';
import * as T from './constants';

export const INITIAL_STATE = {
  rebate: Remote.NotAsked,
  rebates: Remote.NotAsked,
  tableStore: {},
};

const investorReducer = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case T.FETCH_REBATES_LOADING:
        draft.rebates = Remote.Loading;
        break;
      case T.FETCH_REBATES_FAILURE:
        draft.rebates = Remote.Failure(action.payload);
        break;
      case T.FETCH_REBATES_SUCCESS:
        draft.rebates = Remote.Success(action.payload);
        break;
      case T.ADD_REBATE_LOADING:
        draft.rebate = Remote.Loading;
        break;
      case T.ADD_REBATE_FAILURE:
        draft.rebate = Remote.Failure(action.payload);
        break;
      case T.ADD_REBATE_SUCCESS:
        draft.rebate = Remote.Success(action.payload);
        break;
      case T.UPDATE_TABLE: {
        const { parentId, childData } = action.payload;
        // draft.tableStore[parentId] = {
        //   ...draft.tableStore[parentId],
        //   ...childData,
        // };
        draft.tableStore[parentId] = [...childData];
        break;
      }
      case T.REMOVE_TABLE: {
        const { parentId, rowIndex } = action.payload;
        delete draft.tableStore[parentId][rowIndex];
        break;
      }
      case T.REFRESH_TABLE: {
        const { parentId } = action.payload;
        draft.tableStore[parentId] = {};
        break;
      }
      default:
        break;
    }
  });

export default investorReducer;
