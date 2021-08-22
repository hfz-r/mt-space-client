import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useMemo,
} from 'react';

const InspectorStateContext = createContext([]);
const InspectorUpdateContext = createContext({
  addActiveProps: () => {},
  clearActiveProps: () => {},
});

function InspectorProvider({ children }) {
  const [activeProps, setActiveProps] = useState([]);

  const addActiveProps = useCallback(propsName => {
    setActiveProps(prevActiveProps => [...prevActiveProps, propsName]);
  }, []);

  const clearActiveProps = useCallback(() => {
    setActiveProps([]);
  }, []);

  const values = useMemo(() => {
    return { clearActiveProps, addActiveProps };
  }, [addActiveProps, clearActiveProps]);

  return (
    <InspectorStateContext.Provider value={activeProps}>
      <InspectorUpdateContext.Provider value={values}>
        {children}
      </InspectorUpdateContext.Provider>
    </InspectorStateContext.Provider>
  );
}

function useInspectorState() {
  return useContext(InspectorStateContext);
}

function useInspectorUpdate() {
  return useContext(InspectorUpdateContext);
}

export { InspectorProvider, useInspectorState, useInspectorUpdate };
