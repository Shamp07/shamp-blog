import React from 'react';
import styled from 'styled-components';
import HeaderLeftLogo from './HeaderLeftLogo';
import HeaderRightList from './HeaderRightList';
import SignModal from '../../util/SignModal';
import AlertModal from '../../util/AlertModal';

const Header: React.FC = () => (
  <div>
    <HeaderTopBar>
      <ResponsiveContainer>
        <HeaderLeftLogo />
        <HeaderRightList />
      </ResponsiveContainer>
    </HeaderTopBar>
    <BackgroundImage />
    <SignModal />
    <AlertModal />
  </div>
);

const ResponsiveContainer = styled.div`
  height: 70px;
  max-width: 1044px;
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
