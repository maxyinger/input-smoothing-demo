import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Ease from "../../animation/ease";
import tween from "../../animation/tween";
import { PAGE_TRANSITION_TIME } from "../../constants";
import { useIndexContext } from "../../state";
import Fsa from "../common/full-screen-absolute";

const Container = styled(Fsa)`
  overflow: hidden;
`;

const Bg = styled.div`
  background-image: ${p => `linear-gradient(
            to bottom,
            ${p.startColor} 33.333%,
            ${p.endColor} 66.666%
          );`};
  position: relative;
  overflow: hidden;
  top: 0;
  left: 0;
  height: 300%;
  width: 100%;
  transform: translateY(calc((var(--progress, 0)) * -66.666%));
  will-change: transform;
`;

const GradientTransitionBg = () => {
  const container = useRef();
  const {
    backgroundColor,
    disableStateUpdates,
    enableStateUpdates
  } = useIndexContext();
  const [previousColor, setPreviousColor] = useState(backgroundColor);

  const updateProgress = v => {
    const containerTag = container.current;
    if (containerTag) {
      containerTag.style.setProperty("--progress", v);
    }
  };

  useEffect(() => {
    if (backgroundColor === previousColor) return;

    const onComplete = () => {
      updateProgress(0);
      setPreviousColor(backgroundColor);
      enableStateUpdates();
    };

    disableStateUpdates();
    tween({
      from: { progress: 0 },
      to: { progress: 1 },
      duration: PAGE_TRANSITION_TIME,
      ease: Ease.inOutSine,
      onComplete
    }).start(v => {
      updateProgress(v.progress);
    });
  }, [backgroundColor, disableStateUpdates, enableStateUpdates, previousColor]);

  return (
    <Container ref={container}>
      <Bg
        startColor={previousColor}
        endColor={backgroundColor}
        background={`
          linear-gradient(
            to top,
            ${backgroundColor} 33.333%,
            ${previousColor} 66.666%
          );
        `}
      />
    </Container>
  );
};

export default GradientTransitionBg;
