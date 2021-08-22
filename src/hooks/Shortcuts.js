import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { useHotkeys } from 'react-hotkeys-hook';
import { actions, selectors } from 'stores';

const keyMap = {
  DELETE_NODE: 'Backspace, del',
  TOGGLE_BUILDER_MODE: 'b',
  TOGGLE_CODE_PANEL: 'c',
  UNDO: 'ctrl+z, command+z',
  REDO: 'ctrl+y, cmd+y',
  UNSELECT: 'esc',
  PARENT: 'p',
  DUPLICATE: 'ctrl+d, command+d',
  KONAMI_CODE: 'up up down down left right left right b a, up up down down left right left right B A',
};

const hasNoSpecialKeyPressed = event =>
  !event?.metaKey && !event?.shiftKey && !event?.ctrlKey && !event?.altKey;

const useShortcuts = () => {
  const dispatch = useDispatch();
  const selected = useSelector(selectors.query.getSelectedComponent);

  const deleteNode = event => {
    if (event) {
      event.preventDefault();
    }
    dispatch(actions.query.deleteComponent(selected.id));
  };

  const toggleBuilderMode = event => {
    if (event && hasNoSpecialKeyPressed(event)) {
      event.preventDefault();
      dispatch(actions.queryApp.toggleBuilderMode());
    }
  };

  const toggleCodePanel = event => {
    if (event && hasNoSpecialKeyPressed(event)) {
      event.preventDefault();
      dispatch(actions.queryApp.toggleCodePanel());
    }
  };

  const undo = event => {
    if (event) {
      event.preventDefault();
    }
    dispatch(UndoActionCreators.undo());
  };

  const redo = event => {
    if (event) {
      event.preventDefault();
    }
    dispatch(UndoActionCreators.redo());
  };

  const onUnselect = () => {
    dispatch(actions.query.unselect());
  };

  const onSelectParent = event => {
    if (event && hasNoSpecialKeyPressed(event)) {
      event.preventDefault();
      dispatch(actions.query.selectParent());
    }
  };

  const onDuplicate = event => {
    if (event) {
      event.preventDefault();
    }
    dispatch(actions.query.duplicate());
  };

  const onKonamiCode = () => {
    dispatch(actions.query.loadDemo('secretchakra'));
  };

  useHotkeys(keyMap.DELETE_NODE, deleteNode, {}, [selected.id]);
  useHotkeys(keyMap.TOGGLE_BUILDER_MODE, toggleBuilderMode);
  useHotkeys(keyMap.TOGGLE_CODE_PANEL, toggleCodePanel);
  useHotkeys(keyMap.UNDO, undo);
  useHotkeys(keyMap.REDO, redo);
  useHotkeys(keyMap.UNSELECT, onUnselect);
  useHotkeys(keyMap.PARENT, onSelectParent);
  useHotkeys(keyMap.DUPLICATE, onDuplicate);
  useHotkeys(keyMap.KONAMI_CODE, onKonamiCode);
};

export default useShortcuts;
