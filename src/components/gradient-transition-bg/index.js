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
    currentState,
    disableStateUpdates,
    enableStateUpdates
  } = useIndexContext();
  const [previousState, setPreviousState] = useState(currentState);

  const updateProgress = v => {
    const containerTag = container.current;
    if (containerTag) {
      containerTag.style.setProperty("--progress", v);
    }
  };

  useEffect(() => {
    if (currentState.key === previousState.key) return;

    const onComplete = () => {
      updateProgress(0);
      setPreviousState(currentState);
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
  }, [currentState, disableStateUpdates, enableStateUpdates, previousState]);

  return (
    <Container ref={container}>
      <Bg
        startColor={previousState.backgroundColor}
        endColor={currentState.backgroundColor}
      />
    </Container>
  );
};

export default GradientTransitionBg;
