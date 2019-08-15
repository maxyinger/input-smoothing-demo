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
  cursor: ${p => (p.transitioning ? "wait" : "e-resize")};
`;

const ControllerPrev = styled.div`
  ${panelStyles}
  width: 40%;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
  opacity: 0.12;
  cursor: ${p => (p.transitioning ? "wait" : "w-resize")};
`;

const ControllerPanels = () => {
  const { incrementIndex, decrementIndex, disabled } = useIndexContext();
  const { setPrev, setNext } = useCursorDispatch();
  return (
    <Fsa>
      <ControllerPrev
        onClick={decrementIndex}
        onMouseOver={setPrev}
        transitioning={disabled}
      />
      <ControllerNext
        onClick={incrementIndex}
        onMouseOver={setNext}
        transitioning={disabled}
      />
    </Fsa>
  );
};

export default ControllerPanels;
