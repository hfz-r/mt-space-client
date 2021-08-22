import * as T from './constants';

export const reset = components => ({
  type: T.RESET,
  payload: components,
});

export const loadDemo = templateType => ({
  type: T.LOAD_DEMO,
  payload: templateType,
});

export const resetProps = componentId => ({
  type: T.RESET_PROPS,
  payload: componentId,
});

export const updateProps = ({ id, name, value }) => ({
  type: T.UPDATE_PROPS,
  payload: { id, name, value },
});

export const deleteProps = ({ id, name }) => ({
  type: T.DELETE_PROPS,
  payload: { id, name },
});

export const deleteComponent = componentId => ({
  type: T.DELETE_COMPONENT,
  payload: componentId,
});

export const moveComponent = ({ parentId, componentId }) => ({
  type: T.MOVE_COMPONENT,
  payload: { parentId, componentId },
});

export const moveSelectedComponentChildren = ({ fromIndex, toIndex }) => ({
  type: T.MOVE_SELECTED_COMPONENT_CHILDREN,
  payload: { fromIndex, toIndex },
});

export const addComponent = ({ parentName, type, rootParentType, testId }) => ({
  type: T.ADD_COMPONENT,
  payload: { parentName, type, rootParentType, testId },
});

export const addMetaComponent = ({ components, root, parent }) => ({
  type: T.ADD_META_COMPONENT,
  payload: { components, root, parent },
});

export const select = selectedId => ({
  type: T.SELECT,
  payload: selectedId,
});

export const unselect = () => ({
  type: T.UNSELECT,
});

export const selectParent = () => ({
  type: T.SELECT_PARENT,
});

export const duplicate = () => ({
  type: T.DUPLICATE,
});

export const setComponentName = ({ componentId, name }) => ({
  type: T.SET_COMPONENT_NAME,
  payload: { componentId, name },
});

export const hover = componentId => ({
  type: T.HOVER,
  payload: componentId,
});

export const unhover = () => ({
  type: T.UNHOVER,
});
