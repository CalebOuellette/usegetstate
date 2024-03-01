import { useState, useRef } from "react";

export function useGetState<T>(startingValue: T) {
  const [state, setState] = useState<T>(startingValue);
  const stateRef = useRef<T>(startingValue);

  const getState = () => {
    return stateRef.current;
  };

  const setStateInterceptor = (newState: T | ((oldValue: T) => T)) => {
    if (typeof newState === "function") {
      stateRef.current = (newState as Function)(stateRef.current);
      setState(stateRef.current);
    } else {
      stateRef.current = newState;
      setState(newState);
    }
  };

  return [state, setStateInterceptor, getState] as const;
}
