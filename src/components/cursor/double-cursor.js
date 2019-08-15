import React, { useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import smooth from "../../animation/smooth";
import { CursorStates } from "../../constants";
import pointer from "../../events/pointer";

const CursorWrap = styled.div`
  position: absolute;
  --x: ${p => `calc(var(--mouse-x-${p.refKey}, 0) * 1px)`};
  --y: ${p => `calc(var(--mouse-y-${p.refKey}, 0) * 1px)`};
  transform: translate(-50%, -50%) translate(var(--x), var(--y));
`;

const rotating = prev => keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(${prev ? "-360deg" : "360deg"});
  }
`;

const Cursor1 = styled.div`
  position: relative;
  height: 160px;
  width: 160px;
  border-radius: 9999px;
  animation: ${p =>
    css`
      ${rotating(p.state === CursorStates.PREV)} 4s linear infinite
    `};
`;

const Cursor2 = styled.div`
  position: relative;
  border-radius: 9999px;
  height: 115px;
  width: 115px;
  background-color: rgba(255, 255, 255, 0.2);
`;

const SimpleCursor = ({ refKey, sourceValue, curriedSetter, state }) => {
  const refKey1 = `${refKey}-1`;
  const refKey2 = `${refKey}-2`;

  useEffect(() => {
    const s1 = smooth(sourceValue.getCurrent(), { roundness: 0.065 }).start(
      curriedSetter(refKey1)
    );
    const s2 = smooth(sourceValue.getCurrent(), { roundness: 0.09 }).start(
      curriedSetter(refKey2)
    );
    const p = pointer(sourceValue.getCurrent()).start(v => {
      s1.update(v);
      s2.update(v);
    });
    return () => {
      p.stop();
      s1.stop();
      s2.stop();
    };
  }, []); //eslint-disable-line

  const textPath = `<textPath xlink:href="#curve">
  ${
    state === CursorStates.NEXT
      ? "NEXT \xa0\xa0\xa0\xa0\xa0\xa0\xa0 NEXT \xa0\xa0\xa0\xa0\xa0\xa0\xa0 NEXT"
      : state === CursorStates.PREV
      ? "PREV \xa0\xa0\xa0\xa0\xa0\xa0\xa0 PREV \xa0\xa0\xa0\xa0\xa0\xa0\xa0 PREV"
      : ""
  }
</textPath>`;

  return (
    <>
      <CursorWrap refKey={refKey1}>
        <Cursor1 state={state}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 100 100"
          >
            <path
              id="curve"
              stroke-width="1"
              stroke="white"
              fill="transparent"
              d="M91.53,50c0,22.93-18.59,41.53-41.53,41.53S8.47,72.93,8.47,50S27.07,8.47,50,8.47S91.53,27.07,91.53,50z"
            />
            <text
              className="textPath"
              width="500"
              fill="white"
              dangerouslySetInnerHTML={{ __html: textPath }}
            />
          </svg>
        </Cursor1>
      </CursorWrap>
      <CursorWrap refKey={refKey2}>
        <Cursor2 />
      </CursorWrap>
    </>
  );
};

export default SimpleCursor;
