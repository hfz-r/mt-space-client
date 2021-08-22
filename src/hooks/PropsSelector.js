import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInspectorUpdate } from 'contexts/inspector-context';
import { getDefaultFormProps } from 'utils/defaultProps';

const usePropsSelector = propsName => {
  const { addActiveProps } = useInspectorUpdate();

  useEffect(() => {
    // Register form props name for custom props panel
    addActiveProps(propsName);
  }, [addActiveProps, propsName]);

  const value = useSelector(state => {
    const component = state.query.present.components[state.query.present.selectedId];
    const propsValue = component.props[propsName];
    
    if (propsValue !== undefined) {
      return propsValue;
    }

    if (getDefaultFormProps(component.type)[propsName] !== undefined) {
      return getDefaultFormProps(component.type)[propsName];
    }

    return '';
  });

  return value;
};

export default usePropsSelector;
