import React from 'react';
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Header from './components/layout/Header';

const Index: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <div></div>
      </Switch>
    </Router>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

export default Index;