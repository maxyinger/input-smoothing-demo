import React from "react";
import styled from "styled-components";
import Fsa from "../common/full-screen-absolute";
import Pagination from "./pagination";
import { useCursorDispatch } from "../../state/cursor";

const TOP_BOTTOM = "8vh";

const NavWrap = styled(Fsa)`
  pointer-events: none;
`;

const TitleWrap = styled.div`
  position: absolute;
  top: ${TOP_BOTTOM};
  left: 12.75vw;
`;

const Title = styled.h6`
  position: absolute;
  font-size: 20px;
  white-space: nowrap;
  color: white;
  bottom: 0;
  left: 0;
  pointer-events: auto;
`;

const CreditsWrap = styled.div`
  position: absolute;
  top: ${TOP_BOTTOM};
  left: 25.5vw;

  @media screen and (max-width: 1200px) {
    padding-top: 30px;
    left: 12.75vw;
  }
`;

const Credits = styled.ul`
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 12px;
  line-height: 1.3;
  white-space: nowrap;
  transform: translateY(75%);
  pointer-events: auto;

  li {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const NavLinksWrap = styled.div`
  position: absolute;
  top: ${TOP_BOTTOM};
  right: 12.75vw;
`;

const NavLinks = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  pointer-events: auto;

  a {
    margin-left: 35px;

    &:first-of-type {
      margin-left: 0;
    }
  }
`;

const PaginationWrap = styled.div`
  position: absolute;
  bottom: ${TOP_BOTTOM};
  left: 12.5vw;
`;

const PaginationInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const FormidableCreditWrap = styled.div`
  position: absolute;
  bottom: ${TOP_BOTTOM};
  right: 12.5vw;
`;

const FormidableCredit = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  white-space: nowrap;
  pointer-events: auto;
`;

const WordingLeft = styled.div`
  position: absolute;
  pointer-events: auto;
  top: 50%;
  left: 0;
  width: 200px;
  font-size: 12px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  transform-origin: 50% 50%;
  transform: translateY(-50%) rotate(-90deg) translateY(-100px)
    translateY(6.375vw);
  pointer-events: auto;
`;

const WordingRight = styled.div`
  position: absolute;
  pointer-events: auto;
  top: 50%;
  right: 0;
  width: 200px;
  font-size: 12px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  transform-origin: 50% 50%;
  transform: translateY(-50%) rotate(90deg) translateY(-100px)
    translateY(6.375vw);
  pointer-events: auto;
`;

const Nav = () => {
  const { hover } = useCursorDispatch();

  return (
    <NavWrap>
      <TitleWrap>
        <Title>Input Smoothing</Title>
      </TitleWrap>
      <CreditsWrap>
        <Credits>
          <li>Max Yinger</li>
          <li>Amy Dickson</li>
          <li>Steven Musumeche</li>
          <li>Brian Mathews</li>
        </Credits>
      </CreditsWrap>
      <NavLinksWrap>
        <NavLinks>
          <a
            tabIndex={1}
            href="https://www.formidable.com/blog/2019/input-smoothing/"
            onMouseOver={hover}
          >
            Article
          </a>
          <a
            tabIndex={1}
            href="https://github.com/littlemilkstudio/input-smoothing-demo"
            onMouseOver={hover}
          >
            Github
          </a>
          <a
            tabIndex={1}
            href="https://codepen.io/littlemilk/pen/ZgvJym"
            onMouseOver={hover}
          >
            Codepen
          </a>
        </NavLinks>
      </NavLinksWrap>
      <PaginationWrap>
        <PaginationInner>
          <Pagination />
        </PaginationInner>
      </PaginationWrap>
      <FormidableCreditWrap>
        <FormidableCredit>
          made with{" "}
          <span role="img" aria-label="pizza-love">
            🍕
          </span>{" "}
          by{" "}
          <a tabIndex={3} href="https://formidable.com/" onMouseOver={hover}>
            Formidable
          </a>
        </FormidableCredit>
      </FormidableCreditWrap>
      <WordingLeft>An Intro to Reactive Animations.</WordingLeft>
      <WordingRight>Click Left or Right Side to Toggle.</WordingRight>
    </NavWrap>
  );
};

export default Nav;
