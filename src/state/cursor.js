import React, { createContext, useContext, useReducer } from "react";
import { CursorStates as State } from "../constants";

const Actions = {
  SET_PREV: "setPrev",
  SET_NEXT: "setNext",
  HOVER: "hover"
};

const reducer = (state, action) => {
  switch (action) {
    case Actions.SET_PREV:
      return State.PREV;
    case Actions.SET_NEXT:
      return State.NEXT;
    default:
      return State.HOVER;
  }
};

const CursorStateContext = createContext();
const CursorDispatchContext = createContext();

export const CursorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, State.HIDDEN);

  return (
    <CursorDispatchContext.Provider
      value={{
        setPrev: () => dispatch(Actions.SET_PREV),
        setNext: () => dispatch(Actions.SET_NEXT),
        hover: () => dispatch(Actions.HOVER)
      }}
    >
      <CursorStateContext.Provider
        value={{
          state
        }}
      >
        {children}
      </CursorStateContext.Provider>
    </CursorDispatchContext.Provider>
  );
};

export const useCursorState = () => {
  return useContext(CursorStateContext);
};

export const useCursorDispatch = () => {
  return useContext(CursorDispatchContext);
};
