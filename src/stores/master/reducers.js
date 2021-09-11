import produce from 'immer';
import Remote from 'utils/remote';
import * as T from './constants';

export const INITIAL_STATE = {
  investors: Remote.NotAsked,
};

const masterReducer = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case T.FETCH_INVESTORS_LOADING:
        draft.investors = Remote.Loading;
        break;
      case T.FETCH_INVESTORS_FAILURE:
        draft.investors = Remote.Failure(action.payload);
        break;
      case T.FETCH_INVESTORS_SUCCESS:
        draft.investors = Remote.Success(action.payload);
        break;
      default:
        break;
    }
  });

export default masterReducer;
