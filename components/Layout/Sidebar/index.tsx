import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import useStores from '../../../stores/useStores';
import Category, { CategoryProps } from './Category';
import SideTokenMenu from './SideTokenMenu';

const Sidebar: React.FC = () => {
  const { SidebarStore } = useStores();
  const {
    boardCategoryList, topCategoryList,
    isOpenSidebar, toggleSidebar,
  } = SidebarStore;

  return (
    <Wrapper isOpenSidebar={isOpenSidebar}>
      <MobileMenu>
        <CloseIcon icon={faTimes} onClick={toggleSidebar} />
      </MobileMenu>
      <SideTokenMenu />
      <CategoryWrapper>
        <ul>
          {topCategoryList.map(
            (data: CategoryProps) => (
              <Category isBoard={false} path={data.path} name={data.name} key={data.path} />
            ),
          )}
        </ul>
      </CategoryWrapper>
      <BottomCategory>
        <ul>
          {boardCategoryList.map(
            (data: CategoryProps) => (
              <Category isBoard path={data.path} name={data.name} key={data.path} />
            ),
          )}
        </ul>
      </BottomCategory>
    </Wrapper>
  );
};

interface Container {
  isOpenSidebar: boolean;
}

const Wrapper = styled.div<Container>`
  display: block;
  width: 300px;
  float: left;
  z-index: 1000;
  will-change: min-height;
  overflow-y: auto;
  overflow-x: hidden;
  
  @media (max-width: 1064px) {
    background-color: #fff;
    display: ${(props) => (props.isOpenSidebar ? 'block' : 'none')};
    position: fixed;
    height: 100vh;
    width: 250px;
    top: 0;
    right: 0;
  }
`;

const MobileMenu = styled.div`
  display: none;
  height: 40px;
  @media (max-width: 1064px) {
    display: block;
  }
`;

const CloseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 8px;
  right: 10px;
  height: 20px;
  color: #616161;
  
`;

const CategoryWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .15);
  padding: 7px 0;
  
  @media (max-width: 1064px) {
    box-shadow: none !important;
    border-top: 1px solid #e6e6e6;
  }
  
  & > ul {
    list-style: none;
  }

  & > ul > li {
    height: 40px;
    line-height: 41px;
    margin: 4px 0 4px 15px;
    cursor: pointer;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    color: #616161;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.3s;

    @media (max-width: 1064px) {
      outline: none;
    }

    &:hover {
      background-color: #e6e6e6;
      transition: all 0.3s;
    }
    
    & > a {
      display: inline-block;
      color: #616161;
      padding-left: 14px;
      text-decoration: none;
      width: 270px;
      height: 100%;
    }
  }
`;

const BottomCategory = styled(CategoryWrapper)`
  margin-top: 10px;
  @media (max-width: 1064px) {
    margin-top: 0;
  }
`;

export default observer(Sidebar);
