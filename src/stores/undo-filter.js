import { query as AT } from './actionTypes';

export default function filterActions(action) {
  if (
    [
      AT.RESET,
      AT.LOAD_DEMO,
      AT.RESET_PROPS,
      AT.UPDATE_PROPS,
      AT.ADD_COMPONENT,
      AT.DELETE_COMPONENT,
      AT.MOVE_COMPONENT,
      AT.ADD_META_COMPONENT,
      AT.MOVE_SELECTED_COMPONENT_CHILDREN,
      AT.DUPLICATE,
    ].includes(action.type)
  ) {
    return true;
  }
  return false;
}
