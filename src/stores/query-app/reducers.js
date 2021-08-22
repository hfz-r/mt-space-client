import * as T from './constants';
import { actionTypes as AT } from '../index';

export const INITIAL_STATE = {
  showLayout: true,
  showQuery: false,
  inputTextFocused: false,
  overlay: undefined,
};

const queryAppReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case T.TOGGLE_BUILDER_MODE: {
      return {
        ...state,
        showLayout: !state.showLayout,
      };
    }
    case T.TOGGLE_QUERY_PANEL: {
      return {
        ...state,
        showCode: !state.showCode,
      };
    }
    case T.TOGGLE_INPUT_TEXT: {
      return {
        ...state,
        inputTextFocused: !state.inputTextFocused,
      };
    }
    case T.SET_OVERLAY: {
      return {
        ...state,
        overlay: payload,
      };
    }
    case AT.query.DELETE_COMPONENT: {
      return {
        ...state,
        overlay: undefined,
      };
    }
    case '@@redux-undo/UNDO':
      return {
        ...state,
        overlay: undefined,
      };
    default:
      return state;
  }
};

export default queryAppReducer;
