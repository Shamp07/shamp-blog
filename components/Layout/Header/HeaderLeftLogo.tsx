import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

import { MediaQuery } from '@styles';
import * as T from '@types';

const HeaderLeftLogo = () => (
  <ListWrapper>
    <RightList>
      <li>
        <NoStyleSpan>
          <Link href="/">
            <ResponsiveLogo />
          </Link>
        </NoStyleSpan>
      </li>
      <li>
        <Link href="/">
          <NoStyleLogo>
            Shamp Blog
          </NoStyleLogo>
        </Link>
      </li>
    </RightList>
  </ListWrapper>
);

const ResponsiveLogo = styled.span({
  display: 'inline-block',
  width: '70px',
  height: '70px',
  backgroundImage: 'url("/logo.png")',
  backgroundSize: '70px',

  [MediaQuery[T.Device.LARGE]]: {
    backgroundSize: '56px',
    width: '56px !important',
    height: '56px !important',
  },
});

const ListWrapper = styled.div({
  display: 'inline-block',
  width: '250px',
  height: '70px',

  [MediaQuery[T.Device.LARGE]]: {
    height: '56px !important',
    width: '200px',
  },
});

const RightList = styled.ul({
  display: 'inline-flex',
  listStyle: 'none',
  width: '100%',
  height: '70px',

  [MediaQuery[T.Device.LARGE]]: {
    height: '56px !important',
  },

  '& > li': {
    height: '70px',
    lineHeight: '70px',

    [MediaQuery[T.Device.LARGE]]: {
      height: '56px !important',
      lineHeight: '56px !important',
    },
  },
});

const NoStyleSpan = styled.span({
  display: 'block',
  color: '#ffffff',
  transition: 'all 0.125s ease-in 0s',
  cursor: 'pointer',
  height: '70px',
  fontWeight: 500,
  textAlign: 'center',

  [MediaQuery[T.Device.LARGE]]: {
    height: '56px !important',
  },
});

const NoStyleLogo = styled(NoStyleSpan)({
  fontSize: '30px',
  lineHeight: '70px',
  width: '175px',
  color: '#fff',

  [MediaQuery[T.Device.LARGE]]: {
    textAlign: 'left',
    fontSize: '25px',
    lineHeight: '56px !important',
    width: '140px',
  },
});

export default HeaderLeftLogo;
