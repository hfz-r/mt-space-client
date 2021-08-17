import { createContext, useContext } from 'react';

export const ProgressContext = createContext({
  value: 0,
  start: () => {},
  done: () => {},
});

export const useProgress = () => {
  return useContext(ProgressContext);
};
