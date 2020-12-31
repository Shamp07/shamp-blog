import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import CategoryList from './CategoryList';

const Sidebar: React.FC = () => {
  const { SidebarStore } = useStores();
  const { topCategoryList, bottomCategoryList, isOpenSidebar } = SidebarStore;
  return (
    <Wrapper isOpenSidebar={isOpenSidebar}>
      <Category>
        <ul>
          <CategoryList array={topCategoryList} />
        </ul>
      </Category>
      <BottomCategory>
        <ul>
          <CategoryList array={bottomCategoryList} />
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
  width: 250px;
  height: 300px;
  float: left;
  z-index: 1000;
  will-change: min-height;
  @media (max-width: 1064px) {
    background-color: #fff;
    display: ${(props) => (props.isOpenSidebar ? 'block' : 'none')};
    position: fixed;
    height: 100vh;
    top: 0;
    right: 0;
  }
`;

const Category = styled.div`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .15);
  padding: 7px 0;
  
  @media (max-width: 1064px) {
    box-shadow: none !important;
  }
  
  & > ul {
    list-style: none;
  }

  & > ul > li {
    height: 40px;
    line-height: 41px;
    margin: 4px 0 4px 15px;
    padding-left: 15px;
    cursor: pointer;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    color: #616161;
    font-size: 14px;
    font-weight: bold;

    &:hover {
      background-color: #e6e6e6;
      transition: all 0.3s;
    }

    &.active {
      background-color: #2d79c7;
      transition: all 0.3s;
      
      & > a {
        color: #fff;
      }
    }
    
    & > a {
      display: inline-block;
      color: #616161;
      text-decoration: none;
      width: 100%;
      height: 100%;
    }
  }
`;

const BottomCategory = styled(Category)`
  margin-top: 10px;
  @media (max-width: 1064px) {
    margin-top: 0px;
  }
`;

export default observer(Sidebar);
