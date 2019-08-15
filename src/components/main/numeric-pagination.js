import React from "react";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-left: 20px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

const PageNumber = styled.h6`
  font-size: 28px;
  white-space: nowrap;
  color: white;
  font-variant-numeric: tabular-nums;
`;

const Rule = styled.div`
  background-color: white;
  height: 1px;
  width: 4.6vw;
`;

const NumericPagination = ({ currentIndex, length }) => {
  return (
    <Content>
      <PageNumber>{`0${currentIndex}`}</PageNumber>
      <Rule />
      <PageNumber>{`0${length}`}</PageNumber>
    </Content>
  );
};

export default NumericPagination;
