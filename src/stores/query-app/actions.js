import * as T from './constants';

export const toggleBuilderMode = () => ({
  type: T.TOGGLE_BUILDER_MODE,
});

export const toggleQueryPanel = () => ({
  type: T.TOGGLE_QUERY_PANEL,
});

export const toggleInputText = () => ({
  type: T.TOGGLE_INPUT_TEXT,
});

export const setOverlay = overlay => ({
  type: T.SET_OVERLAY,
  payload: overlay,
});
