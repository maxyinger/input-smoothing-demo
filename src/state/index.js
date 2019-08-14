import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef
} from "react";

export const State = {
  SIMPLE: "simple",
  STRETCH: "stretch",
  DOUBLE: "double"
};

const NumSlides = Object.keys(State).length;

const wrapIndex = v => {
  return ((v % NumSlides) + NumSlides) % NumSlides;
};

const BackgroundColors = ["#0e1fef", "#ec8632", "#e63323"];
// const BackgroundColors = ["#2E4036", "#033F63", "#F06543"];

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
        setIndex,
        backgroundColor: BackgroundColors[index],
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
