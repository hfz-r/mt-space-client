import { useState, useEffect, useRef } from 'react';
import { Progress, VStack, CircularProgress } from '@chakra-ui/react';
import { ProgressContext, useProgress } from './context';

const LoadingProgress = () => {
  const { value } = useProgress();
  return (
    <VStack
      align="flex-end"
      position="absolute"
      zIndex={1234}
      top={0}
      left={0}
      right={0}
    >
      <Progress value={value} size="xs" width="100%" />
      <CircularProgress size="24px" isIndeterminate pr={2} />
    </VStack>
  );
};

const ProgressProvider = ({ children }) => {
  const step = useRef(5);
  const [value, setValue] = useState(0);
  const [isOn, setOn] = useState(false);

  useEffect(() => {
    if (isOn) {
      let timeout = 0;

      if (value < 20) {
        step.current = 5;
      } else if (value < 40) {
        step.current = 4;
      } else if (value < 60) {
        step.current = 3;
      } else if (value < 80) {
        step.current = 2;
      } else {
        step.current = 1;
      }

      if (value <= 98) {
        timeout = setTimeout(() => {
          setValue(value + step.current);
        }, 500);
      }

      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [value, isOn]);

  const start = () => {
    setValue(0);
    setOn(true);
  };

  const done = () => {
    setValue(100);
    setTimeout(() => {
      setOn(false);
    }, 200);
  };

  return (
    <ProgressContext.Provider
      value={{
        value,
        start,
        done,
      }}
    >
      {isOn ? <LoadingProgress /> : <></>}
      {children}
    </ProgressContext.Provider>
  );
};

export { LoadingProgress, ProgressProvider };
