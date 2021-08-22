import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'stores';

const useForm = () => {
  const dispatch = useDispatch();
  const componentId = useSelector(selectors.query.getSelectedComponentId);

  const setValueFromEvent = ({ target: { name, value } }) => {
    setValue(name, value);
  };

  const setValue = useCallback(
    (name, value) => {
      dispatch(
        actions.query.updateProps({
          id: componentId,
          name,
          value,
        })
      );
    },
    [componentId, dispatch]
  );

  return { setValue, setValueFromEvent };
};

export default useForm;
