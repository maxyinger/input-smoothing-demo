import React, { useEffect } from "react";
import styled from "styled-components";
import smooth from "../../animation/smooth";
import { CursorStates } from "../../constants";
import pointer from "../../events/pointer";

const CursorWrap = styled.div`
  position: absolute;
  --x: ${p => `calc(var(--mouse-x-${p.refKey}, 0) * 1px)`};
  --y: ${p => `calc(var(--mouse-y-${p.refKey}, 0) * 1px)`};
  transform: translate(-50%, -50%) translate(var(--x), var(--y));
`;

const Cursor = styled.div`
  position: relative;
  height: 35px;
  width: 35px;
  border: 2px solid white;
  border-radius: 9999px;
`;

const CursorText = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 150%);
  font-size: 8px;
  text-transform: uppercase;
`;

const SimpleCursor = ({ refKey, sourceValue, curriedSetter, state }) => {
  useEffect(() => {
    const s = smooth(sourceValue.getCurrent(), { roundness: 0.065 }).start(
      curriedSetter(refKey)
    );
    const p = pointer(sourceValue.getCurrent()).start(s.update);
    return () => {
      p.stop();
      s.stop();
    };
  }, []); //eslint-disable-line

  const cursorText =
    state === CursorStates.NEXT
      ? "next"
      : state === CursorStates.PREV
      ? "prev"
      : "";

  return (
    <CursorWrap refKey={refKey}>
      <Cursor />
      <CursorText>{cursorText}</CursorText>
    </CursorWrap>
  );
};

export default SimpleCursor;
