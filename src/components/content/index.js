import React, { useState, useEffect, useReducer } from "react";
import styled, { css, keyframes } from "styled-components";
import Fsa from "../common/full-screen-absolute";
import { useIndexContext } from "../../state";
import { PAGE_TRANSITION_TIME } from "../../constants";

const LINE_STAGGER = 50;

const Container = styled(Fsa)`
  pointer-events: none;
`;

const LineHidden = styled.div`
  overflow: hidden;
`;

const lineStyles = css`
  line-height: 1;
  pointer-events: auto;
  white-space: nowrap;
  will-change: transform;
  transform: translateY(-120%);
`;

const Heading = styled.h1`
  font-size: 6.914vw; /* font-size: 177px; */
  ${lineStyles}
`;

const enterFrames = keyframes`
   from {
    transform: translateY(120%);;
  }

  to {
    transform: translateY(0%);;
  }
`;

const exitFrames = keyframes`
  to {
    transform: translateY(-120%);;
  }
`;

const Controller = styled.div`
  ${p =>
    p.active
      ? css`
          ${Heading} {
            transform: translateY(${p.firstMount ? 0 : 110}%);
            animation: ${enterFrames}
              ${p.firstMount
                ? 0
                : ((PAGE_TRANSITION_TIME * 5) / 6 - LINE_STAGGER) / 1000}s
              cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
            animation-delay: ${PAGE_TRANSITION_TIME / 3 / 1000}s;
          }

          ${LineHidden}:last-of-type ${Heading} {
            animation-delay: ${(PAGE_TRANSITION_TIME / 3 + LINE_STAGGER) /
              1000}s;
          }
        `
      : css`
          ${Heading} {
            transform: translateY(${p.firstMount ? -110 : 0}%);
            animation: ${exitFrames}
              ${((PAGE_TRANSITION_TIME * 1) / 3 - LINE_STAGGER) / 1000}s
              cubic-bezier(0.785, 0.135, 0.15, 0.86) forwards;
          }
        `};
`;

const HeadParingController = styled(Controller)`
  position: absolute;
  top: 50%;
  left: 25.5%;
  transform: translateY(-50%);
`;

const HeadPairing = ({ lines, active, wasActive, firstMount }) => {
  return (
    <HeadParingController
      active={active}
      wasActive={wasActive}
      firstMount={firstMount}
    >
      {lines.map((line, i) => (
        <LineHidden key={`${line}-${i}`}>
          <Heading>{line}</Heading>
        </LineHidden>
      ))}
    </HeadParingController>
  );
};

const reducer = (state, index) => ({ current: index, previous: state.current });

const Content = () => {
  const { index } = useIndexContext();
  const [state, dispatch] = useReducer(reducer, 0);
  useEffect(() => dispatch(index), [index]);

  const firstMount = isNaN(state.previous);

  return (
    <Container>
      <HeadPairing
        lines={["Simple", "& Smooth"]}
        active={state.current === 0}
        firstMount={firstMount}
      />
      <HeadPairing
        lines={["Squash", "& Stretch"]}
        active={state.current === 1}
        firstMount={firstMount}
      />
      <HeadPairing
        lines={["Playful", "& Double"]}
        active={state.current === 2}
        firstMount={firstMount}
      />
    </Container>
  );
};

export default Content;
