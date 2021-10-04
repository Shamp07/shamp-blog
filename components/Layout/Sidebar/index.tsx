import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import stores from '@stores';
import { MediaQuery } from '@styles';
import * as T from '@types';
import dsPalette from '@constants/ds-palette';
import Category from './Category';
import SideTokenMenu from './SideTokenMenu';

const Sidebar = () => {
  const { sidebarStore } = stores();
  const {
    categories, topCategories,
    isOpenSidebar, toggleSidebar,
  } = sidebarStore;

  return (
    <Wrapper isOpenSidebar={isOpenSidebar}>
      <MobileMenu>
        <CloseIcon icon={faTimes} onClick={toggleSidebar} />
      </MobileMenu>
      <SideTokenMenu />
      <CategoryWrapper>
        <ul>
          {topCategories.map(
            (data) => (
              <Category isBoard={false} path={data.path} name={data.name} key={data.path} />
            ),
          )}
        </ul>
      </CategoryWrapper>
      <BottomCategory>
        <ul>
          {categories.map((data) => (
            <Category isBoard path={data.path} name={data.name} key={data.path} />
          ))}
        </ul>
      </BottomCategory>
    </Wrapper>
  );
};

interface SidebarProp {
  isOpenSidebar: boolean;
}

const Wrapper = styled.div<SidebarProp>(({ isOpenSidebar }) => ({
  display: 'block',
  width: '280px',
  willChange: 'min-height',

  [MediaQuery[T.Device.LARGE]]: {
    backgroundColor: '#fff',
    display: isOpenSidebar ? 'block' : 'none',
    position: 'fixed',
    zIndex: 1,
    height: '100%',
    width: '250px',
    top: 0,
    right: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));

const MobileMenu = styled.div({
  display: 'none',
  height: '44px',

  [MediaQuery[T.Device.LARGE]]: {
    display: 'block',
  },
});

const CloseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 8px;
  right: 10px;
  height: 20px;
  color: #616161;
`;

const CategoryWrapper = styled.div({
  width: '100%',
  padding: '10px 0',
  backgroundColor: '#fff',
  borderRadius: '14px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .15)',

  [MediaQuery[T.Device.LARGE]]: {
    boxShadow: 'none !important',
    borderTop: '1px solid #e6e6e6',
    borderRadius: 0,
  },

  '& > ul': {
    listStyle: 'none',
  },

  '& > ul > li': {
    height: '40px',
    lineHeight: '41px',
    marginLeft: '15px',
    marginBottom: '10px',
    cursor: 'pointer',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    fontSize: '14px',
    fontWeight: 400,
    transition: 'all 0.3s',

    [MediaQuery[T.Device.LARGE]]: {
      outline: 'none',
    },

    '&:last-of-type': {
      marginBottom: 0,
    },

    '&:hover': {
      backgroundColor: '#e6e6e6',
      transition: 'all 0.3s',
    },

    '& > a': {
      display: 'inline-block',
      paddingLeft: '14px',
      textDecoration: 'none',
      width: '251px',
      height: '100%',
      color: dsPalette.typePrimary.toString(),
    },
  },
});

const BottomCategory = styled(CategoryWrapper)({
  marginTop: '16px',
  [MediaQuery[T.Device.LARGE]]: {
    marginTop: 0,
  },
});

export default observer(Sidebar);
