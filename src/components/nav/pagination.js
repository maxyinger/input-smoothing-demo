import React from "react";
import styled from "styled-components";
import Content from "../../content";
import { useIndexContext } from "../../state";
import { useCursorDispatch } from "../../state/cursor";

const Container = styled.div`
  white-space: nowrap;
`;

const PageBubble = styled.a`
  display: inline-block;
  height: 8px;
  width: 8px;
  margin-left: 12px;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, ${p => (p.active ? 1 : 0.3)});
  transition: background-color 0.1s linear;
  pointer-events: auto;
  cursor: ${p => (p.disabled ? "wait" : "pointer")};

  &:first-of-type {
    margin-left: 0;
  }
`;

const Pagination = () => {
  const { currentState, disabled, setIndex } = useIndexContext();
  const { hover } = useCursorDispatch();

  return (
    <Container>
      {Object.keys(Content).map((key, i) => (
        <PageBubble
          key={key}
          tabIndex={2}
          href="#"
          active={key === currentState.key}
          disabled={disabled}
          onMouseOver={hover}
          onClick={e => {
            e.preventDefault();
            setIndex(_ => i);
          }}
        />
      ))}
    </Container>
  );
};

export default Pagination;
