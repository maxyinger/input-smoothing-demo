import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef
} from "react";
import { AppStates as State } from "../constants";
import Content from "../content";

const NumSlides = Object.keys(State).length;

const wrapIndex = v => {
  return ((v % NumSlides) + NumSlides) % NumSlides;
};

const IndexContext = createContext();

export const IndexProvider = ({ children }) => {
  const disabled = useRef(false);
  const [index, setIndexUnchecked] = useState(0);

  const setIndex = useCallback(fn => {
    !disabled.current && setIndexUnchecked(v => wrapIndex(fn(v)));
  }, []);

  const incrementIndex = useCallback(() => {
    setIndex(v => v + 1);
  }, [setIndex]);

  const decrementIndex = useCallback(() => {
    setIndex(v => v - 1);
  }, [setIndex]);

  const disableStateUpdates = useCallback(() => {
    disabled.current = true;
  }, []);

  const enableStateUpdates = useCallback(() => {
    disabled.current = false;
  }, []);

  return (
    <IndexContext.Provider
      value={{
        index,
        currentState: Content[Object.values(State)[index]],
        setIndex,
        incrementIndex,
        decrementIndex,
        disableStateUpdates,
        enableStateUpdates
      }}
    >
      {children}
    </IndexContext.Provider>
  );
};

export const useIndexContext = () => {
  return useContext(IndexContext);
};
