import React from 'react';
import styled from '@emotion/styled';

import { MediaQuery } from '@styles';
import * as T from '@types';
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

const ResponsiveContainer = styled.div({
  display: 'flex',
  height: '70px',
  maxWidth: '1044px',
  margin: '0 auto',

  [MediaQuery[T.Device.LARGE]]: {
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    height: '56px !important',
  },
});

const BackgroundImage = styled.div({
  width: '100%',
  height: '250px',
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),url(/background.jpg)',
  backgroundPosition: 'center 60%',

  [MediaQuery[T.Device.LARGE]]: {
    display: 'none',
  },
});

const HeaderTopBar = styled.div({
  height: '70px',
  backgroundImage: 'linear-gradient(94deg, #2d79c7, #52a7ff)',
  color: '#ffffff',

  [MediaQuery[T.Device.LARGE]]: {
    height: '56px !important',
  },
});

export default Header;
