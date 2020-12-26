import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import HeaderLeftLogo from './HeaderLeftLogo';
import HeaderRightList from './HeaderRightList';

const Header: React.FC = () => (
  <div>
    <HeaderTopBar>
      <Container maxWidth="lg">
        <HeaderLeftLogo />
        <HeaderRightList />
      </Container>
    </HeaderTopBar>
    <BackgroundImage />
  </div>
);

const BackgroundImage = styled.div`
  width: 100%;
  height: 250px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),url(/background.jpg);
  background-position: center 60%;
`;

const HeaderTopBar = styled.div`
  height: 70px;
  background-image: linear-gradient(94deg, #2d79c7, #52a7ff);
  color: #FFFFFF;
`;

export default Header;
