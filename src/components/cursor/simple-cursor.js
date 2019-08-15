import React, { useEffect } from "react";
import styled from "styled-components";
import { CssEase } from "../../animation/ease";
import smooth from "../../animation/smooth";
import { CursorStates } from "../../constants";
import pointer from "../../events/pointer";
import OpacityOnEnter from "./opacity";

const CursorWrap = styled.div`
  --x: ${p => `calc(var(--mouse-x-${p.refKey}, 0) * 1px)`};
  --y: ${p => `calc(var(--mouse-y-${p.refKey}, 0) * 1px)`};

  position: absolute;
  will-change: transform;
  transform: translate(-50%, -50%) translate(var(--x), var(--y));
`;

const Cursor = styled.div`
  position: relative;
  height: 35px;
  width: 35px;
  border: 2px solid white;
  border-radius: 9999px;
  transform-origin: 50% 50%;
  transform: scale(${p => (p.state === CursorStates.HOVER ? 1.8 : 1)});
  opacity: ${p => (p.state === CursorStates.HOVER ? 0.1 : 1)};
  transition: ${p =>
    p.state === CursorStates.HOVER
      ? `0.3s all ${CssEase.outCirc}`
      : `0.6s all ${CssEase.outCirc}`};
`;

const CursorTextInner = styled.div`
  position: relative;
  top: 0;
  left: 50%;
  height: 100%;
  color: white;
  opacity: ${p => (p.state === CursorStates.HOVER ? 0 : 1)};
  transform: translateX(-50%)
    translateY(${p => (p.state === CursorStates.PREV ? -100 : 0)}%);
  transition: 0.3s transform ${CssEase.outSine};
`;

const CursorText = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  height: 8px;
  transform: translate(-50%, 150%);
  font-size: 8px;
  text-align: center;
  text-transform: uppercase;
  color: transparent;
  overflow: hidden;
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

  return (
    <OpacityOnEnter>
      <CursorWrap refKey={refKey}>
        <Cursor state={state} />
        <CursorText>
          <CursorTextInner state={state}>next</CursorTextInner>
          <CursorTextInner state={state}>prev</CursorTextInner>
        </CursorText>
      </CursorWrap>
    </OpacityOnEnter>
  );
};

export default SimpleCursor;
