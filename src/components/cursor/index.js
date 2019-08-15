import React, { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import value from "../../animation/value";
import { ORIGIN_2D } from "../../constants";
import pointer from "../../events/pointer";
import { curriedCssVarSetter } from "../../utils";
import SimpleCursor from "./simple-cursor";
import SquashCursor from "./squash-cursor";
import { useCursorState } from "../../state/cursor";
import { useIndexContext } from "../../state";
import { AppStates } from "../../constants";

const Container = styled.div`
  position: absolute;
  pointer-events: none;
`;

const Cursor = () => {
  const ref = useRef();
  const { currentState } = useIndexContext();
  const { state } = useCursorState();

  const sourceValue = useMemo(() => {
    return value(ORIGIN_2D).start();
  }, []);

  useEffect(() => {
    const p = pointer().start(sourceValue.update);
    return () => {
      p.stop();
    };
  }, []); //eslint-disable-line

  return (
    <Container ref={ref}>
      {
        {
          [AppStates.SIMPLE]: (
            <SimpleCursor
              refKey={AppStates.SIMPLE}
              state={state}
              sourceValue={sourceValue}
              curriedSetter={curriedCssVarSetter(ref)}
            />
          ),
          [AppStates.STRETCH]: (
            <SquashCursor
              refKey={AppStates.STRETCH}
              state={state}
              sourceValue={sourceValue}
              curriedSetter={curriedCssVarSetter(ref)}
            />
          )
        }[currentState.key]
      }
    </Container>
  );
};

export default Cursor;
