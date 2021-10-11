import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';

import { MediaQuery } from '@styles';
import * as T from '@types';
import dsPalette from '@constants/ds-palette';
import HeaderSidebarButton from './HeaderSidebarButton';
import HeaderTokenMenu from './HeaderTokenMenu';

const HeaderRightList = () => (
  <Wrapper>
    <ListWrapper>
      <RightList>
        <HeaderTokenMenu />
        <li>
          <a href="https://github.com/Shamp07">
            <FontAwesomeIcon icon={faGithubAlt} />
          </a>
        </li>
      </RightList>
    </ListWrapper>
    <HeaderSidebarButton />
  </Wrapper>
);

const Wrapper = styled.div`
  display: inline-flex;
  margin-left: auto;
`;

const ListWrapper = styled.div({
  display: 'inline-block',
  width: '165px',
  height: '70px',

  [MediaQuery[T.Device.LARGE]]: {
    display: 'none',
  },
});

const RightList = styled.ul({
  listStyle: 'none',
  display: 'inline-flex',
  width: '100%',
  height: '70px',

  '& > li': {
    width: '55px',
    height: '70px',
    lineHeight: '70px',
    display: 'inline-block',
    textAlign: 'center',
  },

  '& > li > a, & > li > button': {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    margin: '10px 0',
    color: '#fff',
    borderRadius: '25px',
    transition: 'background-color 0.2s',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
  },

  '& > li > button': {
    border: 0,
    padding: 0,
    backgroundColor: 'transparent',

    '&:focus': {
      outline: 0,
    },
  },

  '& svg': {
    padding: '12px',
    width: '25px',
    height: '25px',
    color: dsPalette.typeWhite.toString(),
  },
});

export default HeaderRightList;
