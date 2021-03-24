import React from 'react';
import styled from '@emotion/styled';
import HeaderLeftLogo from './HeaderLeftLogo';
import HeaderRightList from './HeaderRightList';
import HeaderUtilComponents from './HeaderUtilComponents';

const Header = () => (
  <div>
    <HeaderTopBar>
      <ResponsiveContainer>
        <HeaderLeftLogo />
        <HeaderRightList />
      </ResponsiveContainer>
    </HeaderTopBar>
    <BackgroundImage />
    <HeaderUtilComponents />
  </div>
);

const ResponsiveContainer = styled.div`
  display: flex;
  height: 70px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 1064px) {
    padding-left: 0 !important;
    padding-right: 0 !important;
    height: 56px !important;
  }
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 250px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),url(/background.jpg);
  background-position: center 60%;
  @media (max-width: 1064px) {
    display: none;
  }
`;

const HeaderTopBar = styled.div`
  height: 70px;
  background-image: linear-gradient(94deg, #2d79c7, #52a7ff);
  color: #FFFFFF;
  @media (max-width: 1064px) {
    height: 56px !important;
  }
`;

export default Header;
