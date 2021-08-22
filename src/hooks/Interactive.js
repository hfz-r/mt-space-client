import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { actions, selectors } from 'stores';

const useInteractive = (component, enableVisualHelper = false) => {
  const dispatch = useDispatch();
  const showLayout = useSelector(selectors.queryApp.getShowLayout);
  const isComponentSelected = useSelector(
    selectors.query.getIsSelectedComponent(component.id)
  );
  const isHovered = useSelector(selectors.query.getIsHovered(component.id));
  const focusInput = useSelector(
    selectors.queryApp.getFocusedComponent(component.id)
  );

  const [, drag] = useDrag({
    item: { id: component.id, type: component.type, isMoved: true },
  });

  const ref = useRef(null);
  let props = {
    ...component.props,
    onMouseOver: event => {
      event.stopPropagation();
      dispatch(actions.query.hover(component.id));
    },
    onMouseOut: () => {
      dispatch(actions.query.unhover());
    },
    onClick: event => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(actions.query.select(component.id));
    },
    onDoubleClick: event => {
      event.preventDefault();
      event.stopPropagation();
      if (focusInput === false) {
        dispatch(actions.queryApp.toggleInputText());
      }
    },
  };

  if (showLayout && enableVisualHelper) {
    props = {
      ...props,
      border: `1px dashed #718096`,
      padding: props.p || props.padding ? props.p || props.padding : 4,
    };
  }

  if (isHovered || isComponentSelected) {
    props = {
      ...props,
      boxShadow: `${focusInput ? '#ffc4c7' : '#4FD1C5'} 0px 0px 0px 2px inset`,
    };
  }

  return { props, ref: drag(ref), drag };
};

export default useInteractive;
