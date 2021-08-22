import produce from 'immer';
import { omit } from 'ramda';
import { generateId } from 'utils/generateId';
import { duplicateComponent, deleteComponent } from 'utils/recursive';
import { DEFAULT_PROPS } from 'utils/defaultProps'
import * as T from './constants';

const DEFAULT_ID = 'root';

export const DEFAULT_COMPONENTS = {
  root: {
    id: DEFAULT_ID,
    parent: DEFAULT_ID,
    type: 'Box',
    children: [],
    props: {},
    rootParentType: '',
    componentName: '',
  },
};

export const INITIAL_STATE = {
  components: DEFAULT_COMPONENTS,
  selectedId: DEFAULT_ID,
  hoveredId: '',
};

const queryReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case T.RESET: {
      return {
        ...state,
        components: payload || DEFAULT_COMPONENTS,
        selectedId: DEFAULT_ID,
      };
    }
    case T.LOAD_DEMO: {
      return {
        ...state,
        selectedId: 'comp-root',
        //components: templates[templateType],
      };
    }
    case T.RESET_PROPS: {
      return produce(state, draftState => {
        const component = draftState.components[payload];
        const { form, ...defaultProps } = DEFAULT_PROPS[component.type] || {}
        draftState.components[payload].props = defaultProps || {}
      });
    }
    case T.UPDATE_PROPS: {
      const { id, name, value } = payload;
      return produce(state, draftState => {
        draftState.components[id].props[name] = value;
      });
    }
    case T.DELETE_PROPS: {
      const { id, name } = payload;
      return {
        ...state,
        components: {
          ...state.components,
          [id]: {
            ...state.components[id],
            props: omit(name, state.components[id].props),
          },
        },
      };
    }
    case T.DELETE_COMPONENT: {
      if (payload === 'root') {
        return state;
      }

      return produce(state, draftState => {
        let component = draftState.components[payload];

        // Remove self
        if (component && component.parent) {
          const children = draftState.components[
            component.parent
          ].children.filter(id => id !== payload);

          draftState.components[component.parent].children = children;
        }

        draftState.selectedId = DEFAULT_ID;
        draftState.components = deleteComponent(
          component,
          draftState.components
        );
      });
    }
    case T.MOVE_COMPONENT: {
      const { parentId, componentId } = payload;
      if (
        state.components[componentId].parent === parentId ||
        parentId === componentId
      ) {
        return state;
      }

      return produce(state, draftState => {
        const previousParentId = draftState.components[componentId].parent;

        const children = draftState.components[
          previousParentId
        ].children.filter(id => id !== componentId);

        // Remove id from previous parent
        draftState.components[previousParentId].children = children;

        // Update parent id
        draftState.components[componentId].parent = parentId;

        // Add new child
        draftState.components[parentId].children.push(componentId);
      });
    }
    case T.MOVE_SELECTED_COMPONENT_CHILDREN: {
      const { fromIndex, toIndex } = payload;
      return produce(state, draftState => {
        const selectedComponent = draftState.components[draftState.selectedId];

        selectedComponent.children.splice(
          toIndex,
          0,
          selectedComponent.children.splice(fromIndex, 1)[0]
        );
      });
    }
    case T.ADD_COMPONENT: {
      const { parentName, type, rootParentType, testId } = payload;
      return produce(state, draftState => {
        const id = testId || generateId();
        const { form, ...defaultProps } = DEFAULT_PROPS[payload.type] || {};
        draftState.selectedId = id;
        draftState.components[parentName].children.push(id);
        draftState.components[id] = {
          id,
          props: defaultProps || {},
          children: [],
          type: type,
          parent: parentName,
          rootParentType: rootParentType || type,
        };
      });
    }
    case T.ADD_META_COMPONENT: {
      const { components, root, parent } = payload;
      return produce(state, draftState => {
        draftState.selectedId = root;
        draftState.components[parent].children.push(root);

        draftState.components = {
          ...draftState.components,
          ...components,
        };
      });
    }
    case T.SELECT: {
      return {
        ...state,
        selectedId: payload,
      };
    }
    case T.UNSELECT: {
      return {
        ...state,
        selectedId: DEFAULT_ID,
      };
    }
    case T.SELECT_PARENT: {
      const selectedComponent = state.components[state.selectedId];
      return {
        ...state,
        selectedId: state.components[selectedComponent.parent].id,
      };
    }
    case T.DUPLICATE: {
      return produce(state, draftState => {
        const selectedComponent = draftState.components[draftState.selectedId];

        if (selectedComponent.id !== DEFAULT_ID) {
          const parentElement = draftState.components[selectedComponent.parent];

          const { newId, clonedComponents } = duplicateComponent(
            selectedComponent,
            draftState.components
          );

          draftState.components = {
            ...draftState.components,
            ...clonedComponents,
          };
          draftState.components[parentElement.id].children.push(newId);
        }
      });
    }
    case T.SET_COMPONENT_NAME: {
      const { componentId, name } = payload;
      return produce(state, draftState => {
        const component = draftState.components[componentId];
        component.componentName = name;
      });
    }
    case T.HOVER: {
      return {
        ...state,
        hoveredId: payload,
      };
    }
    case T.UNHOVER: {
      return {
        ...state,
        hoveredId: undefined,
      };
    }
    default:
      return state;
  }
};

export default queryReducer;
