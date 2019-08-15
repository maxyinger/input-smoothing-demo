import React from "react";
import styled from "styled-components";
import "./App.css";
import Fsa from "./components/common/full-screen-absolute";
import ControllerPanels from "./components/controller-panels";
import GradientTransitionBg from "./components/gradient-transition-bg";
import Main from "./components/main";
import Cursor from "./components/cursor";
import Nav from "./components/nav";
import { IndexProvider } from "./state";
import { CursorProvider } from "./state/cursor";

const AppContainer = styled(Fsa)`
  overflow: hidden;
`;

const App = () => (
  <CursorProvider>
    <IndexProvider>
      <AppContainer>
        <GradientTransitionBg />
        <ControllerPanels />
        <Main />
        <Cursor />
        <Nav />
      </AppContainer>
    </IndexProvider>
  </CursorProvider>
);

export default App;
