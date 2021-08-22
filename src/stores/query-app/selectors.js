export const getShowLayout = state => state.queryApp.showLayout;

export const getShowQuery = state => state.queryApp.showQuery;

export const getFocusedComponent = id => state =>
  state.queryApp.inputTextFocused && state.query.present.selectedId === id;

export const getInputTextFocused = state => state.queryApp.inputTextFocused;
