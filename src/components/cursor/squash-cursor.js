import React, { useEffect } from "react";
import styled from "styled-components";
import smooth from "../../animation/smooth";
import value from "../../animation/value";
import { CursorStates } from "../../constants";
import pointer from "../../events/pointer";

const Cursor1 = styled.div`
  --x: ${p => `calc(var(--mouse-x-${p.refKey}, 0) * 1px)`};
  --y: ${p => `calc(var(--mouse-y-${p.refKey}, 0) * 1px)`};
  --vx: ${p => `calc(1 + var(--mouse-v-${p.refKey}, 0))`};
  --vy: ${p => `calc(1 / 1 - var(--mouse-v-${p.refKey}, 0))`};
  --r: ${p => `calc(var(--mouse-r-${p.refKey}, 0) * 1deg)`};

  position: relative;
  height: 15px;
  width: 15px;
  background-color: white;
  border-radius: 9999px;
  position: absolute;
  transform: translate(-50%, -50%) translate(var(--x), var(--y))
    rotate(var(--r)) scale(var(--vx), var(--vy));
`;

const Cursor2 = styled.div`
  --x: ${p => `calc(var(--mouse-x-${p.refKey}, 0) * 1px)`};
  --y: ${p => `calc(var(--mouse-y-${p.refKey}, 0) * 1px)`};

  position: relative;
  height: 60px;
  width: 60px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  position: absolute;
  transform: translate(-50%, -50%) translate(var(--x), var(--y));
`;

const Arrow = styled.div``;

const SquashCursor = ({ refKey, sourceValue, curriedSetter, state }) => {
  const refKey1 = `${refKey}-1`;
  const refKey2 = `${refKey}-2`;

  useEffect(() => {
    const v = value(sourceValue.getCurrent()).start(
      ({ current, velocity, rotation }) => {
        const vals = {
          ...current,
          v: Math.min(
            Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2)),
            0.8
          ),
          r: rotation
        };
        curriedSetter(refKey1)(vals);
      }
    );
    const s1 = smooth(sourceValue.getCurrent(), { roundness: 0.4 }).start(
      v.update
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

  return (
    <>
      <Cursor2 refKey={refKey2}>
        <Arrow />
      </Cursor2>
      <Cursor1 refKey={refKey1} />
    </>
  );
};

export default SquashCursor;
