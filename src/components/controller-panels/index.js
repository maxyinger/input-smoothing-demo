import React from "react";
import styled, { css } from "styled-components";
import { useIndexContext } from "../../state";
import { useCursorDispatch } from "../../state/cursor";
import Fsa from "../common/full-screen-absolute";

const panelStyles = css`
  position: relative;
  display: inline-block;
  height: 100%;
`;

const ControllerNext = styled.div`
  ${panelStyles}
  width: 60%;
`;

const ControllerPrev = styled.div`
  ${panelStyles}
  width: 40%;
  /* background-color: rgba(0, 0, 0, 0.12); */
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
  opacity: 0.12;
`;

const ControllerPanels = () => {
  const { incrementIndex, decrementIndex } = useIndexContext();
  const { setPrev, setNext } = useCursorDispatch();
  return (
    <Fsa>
      <ControllerPrev onClick={decrementIndex} onMouseOver={setPrev} />
      <ControllerNext onClick={incrementIndex} onMouseOver={setNext} />
    </Fsa>
  );
};

export default ControllerPanels;
