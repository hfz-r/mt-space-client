import produce from 'immer';
import { curry, lensProp, map, set } from 'ramda';
import Remote from 'utils/remote';
import * as T from './constants';

export const INITIAL_STATE = {
  rebate: {},
  rebates: Remote.NotAsked,
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

      case T.FETCH_REBATE_LOADING: {
        const { parent } = action.payload;
        draft.rebate[parent] = Remote.Loading;
        break;
      }
      case T.FETCH_REBATE_FAILURE: {
        const { parent, error } = action.payload;
        draft.rebate[parent] = Remote.Failure(error);
        break;
      }
      case T.FETCH_REBATE_SUCCESS: {
        const { parent, child } = action.payload;
        draft.rebate[parent] = Remote.Success([...child]);
        break;
      }

      case T.ADD_REBATE: {
        const { parent, newChild } = action.payload;
        const oldChild = draft.rebate[parent].getOrElse([]);
        draft.rebate[parent] = Remote.Success([newChild, ...oldChild]);
        break;
      }
      case T.REMOVE_REBATE: {
        const { parent } = action.payload;
        delete draft.rebate[parent];
        break;
      }
      case T.UPDATE_REBATE: {
        const { parent, rowId, columnId, value } = action.payload;
        const child = draft.rebate[parent].getOrElse([]);
        const update = curry((src, id, prop, val) =>
          src.id === id ? set(lensProp(prop), val, src) : src
        );
        const list = map(r => update(r, rowId, columnId, value));
        draft.rebate[parent] = Remote.Success([...list(child)]);
        break;
      }
      default:
        break;
    }
  });

export default investorReducer;
