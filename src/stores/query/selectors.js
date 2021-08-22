import { map } from 'ramda';

export const getComponents = state => state.query.present.components;

export const getComponentBy = nameOrId => state =>
  state.query.present.components[nameOrId];

export const getSelectedComponent = state =>
  state.query.present.components[state.query.present.selectedId];

export const getPropsForSelectedComponent = (state, propsName) =>
  state.query.present.components[state.query.present.selectedId].props[
    propsName
  ];

export const getSelectedComponentId = state => state.query.present.selectedId;

export const getIsSelectedComponent = componentId => state =>
  state.query.present.selectedId === componentId;

export const getSelectedComponentChildren = state => {
  return getSelectedComponent(state).children.map(child =>
    getComponentBy(child)(state)
  );
};

export const getSelectedComponentParent = state =>
  state.query.present.components[getSelectedComponent(state).parent];

export const getHoveredId = state => state.query.present.hoveredId;

export const getIsHovered = id => state => getHoveredId(state) === id;

export const getComponentNames = state => {
  const names = map(
    comp => comp.componentName,
    state.query.present.components
  ).filter(comp => !!comp);

  return Array.from(new Set(names));
};
