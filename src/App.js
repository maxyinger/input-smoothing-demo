import React from "react";
import { IndexProvider } from "./state";
import styled from "styled-components";
import GradientTransitionBg from "./components/gradient-transition-bg";
import ControllerPanels from "./components/controller-panels";
import Fsa from "./components/common/full-screen-absolute";
import Content from "./components/content";
import "./App.css";

const AppContainer = styled(Fsa)`
  overflow: hidden;
`;

const App = () => (
  <IndexProvider>
    <AppContainer>
      <GradientTransitionBg />
      <ControllerPanels />
      <Content />
    </AppContainer>
  </IndexProvider>
);

export default App;
