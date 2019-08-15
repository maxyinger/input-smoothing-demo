import React, { useEffect, useReducer } from "react";
import styled, { css, keyframes } from "styled-components";
import { CssEase } from "../../animation/ease";
import { LINE_STAGGER, PAGE_TRANSITION_TIME } from "../../constants";
import Content from "../../content";
import { useIndexContext } from "../../state";
import Fsa from "../common/full-screen-absolute";

const Container = styled(Fsa)`
  pointer-events: none;
`;

const LineHidden = styled.div`
  overflow: hidden;
`;

const lineStyles = css`
  line-height: 1;
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
              ${CssEase.outCirc} forwards;
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
              ${CssEase.inOutCirc} forwards;
          }
        `};
`;

const HeadParingController = styled(Controller)`
  position: absolute;
  top: 50%;
  left: 25.5%;
  transform: translateY(-50%);
`;

const HeadPairing = ({ itemState, firstMount, active }) => {
  return (
    <HeadParingController active={active} firstMount={firstMount}>
      {itemState.headline.map(line => (
        <LineHidden key={`${itemState.key}-${line}`}>
          <Heading>{line}</Heading>
        </LineHidden>
      ))}
    </HeadParingController>
  );
};

const ContentArray = Object.values(Content);

const reducer = (state, currentState) => ({
  updated: state.updated + 1,
  current: currentState,
  previous: state.current
});

const Main = () => {
  const { currentState } = useIndexContext();
  const [state, dispatch] = useReducer(reducer, {
    current: currentState,
    updated: 0
  });
  useEffect(() => dispatch(currentState), [currentState]);

  const firstMount = state.updated <= 1;

  return (
    <Container>
      {ContentArray.map(itemState => (
        <HeadPairing
          key={itemState.key}
          itemState={itemState}
          active={state.current.key === itemState.key}
          firstMount={firstMount}
        />
      ))}
    </Container>
  );
};

export default Main;
