import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { actions } from 'stores';
import { RootComponents } from 'utils/editor';
import builder from 'containers/QueryBuilder/Composer/builder';

const useDropComponent = (
  componentId,
  accept = RootComponents,
  canDrop = true
) => {
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop({
    accept,
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
    }),
    drop: (item, monitor) => {
      if (!monitor.isOver()) {
        return;
      }

      if (item.isMoved) {
        dispatch(
          actions.query.moveComponent({
            parentId: componentId,
            componentId: item.id,
          })
        );
      } else if (item.isMeta) {
        dispatch(
          actions.query.addMetaComponent(builder[item.type](componentId))
        );
      } else {
        dispatch(
          actions.query.addComponent({
            parentName: componentId,
            type: item.type,
            rootParentType: item.rootParentType,
          })
        );
      }
    },
    canDrop: () => canDrop,
  });

  return { drop, isOver };
};

export default useDropComponent;
