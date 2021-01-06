import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import useStores from '../../../stores/useStores';
import Category from './Category';

interface CategoryProps {
  path: string,
  name: string,
}

const Sidebar: React.FC = () => {
  const { SidebarStore, SignStore } = useStores();
  const {
    topCategoryList, boardCategoryList, isOpenSidebar, toggleSidebar,
  } = SidebarStore;
  const { openSignModal } = SignStore;
  return (
    <Wrapper isOpenSidebar={isOpenSidebar}>
      <MobileMenu>
        <CloseIcon icon={faTimes} onClick={toggleSidebar} />
      </MobileMenu>
      <MobileMenu>
        <TopMenu onClick={openSignModal}>로그인</TopMenu>
        <TopMenu>회원가입</TopMenu>
      </MobileMenu>
      <CategoryWrapper>
        <ul>
          {topCategoryList.map(
            (data: CategoryProps) => <Category path={data.path} name={data.name} key={data.path} />,
          )}
        </ul>
      </CategoryWrapper>
      <BottomCategory>
        <ul>
          {boardCategoryList.map(
            (data: CategoryProps) => <Category path={data.path} name={data.name} key={data.path} />,
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
  height: 300px;
  float: left;
  z-index: 1000;
  will-change: min-height;
  
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
  -webkit-tap-highlight-color: transparent;
  height: 40px;
  @media (max-width: 1064px) {
    display: block;
  }
`;

const TopMenu = styled.div`
  width: 40%;
  padding: 10px;
  display: inline-block;
  text-align: center;
  color: #616161;
  font-weight: bold;
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
    
    &:hover {
      background-color: #e6e6e6;
      transition: all 0.3s;
    }

    @media (max-width: 1064px) {
      outline: none;
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
      padding-left: 14px;
      text-decoration: none;
      width: 100%;
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
