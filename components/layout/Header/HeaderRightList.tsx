import React from 'react';
import styled from 'styled-components';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStores from '../../../stores/useStores';

const HeaderRightList: React.FC = () => {
  const { SignStore, SidebarStore } = useStores();
  const { openSignModal } = SignStore;
  const { toggleSidebar } = SidebarStore;

  return (
    <>
      <ListWrapper>
        <RightList>
          <li>
            <NoStyleA onClick={openSignModal}>
              로그인
            </NoStyleA>
          </li>
          <li>
            <NoStyleA>
              회원가입
            </NoStyleA>
          </li>
          <GithubList>
            <NoStyleA href="https://github.com/Shamp07">
              <Icon icon={faGithub} />
            </NoStyleA>
          </GithubList>
        </RightList>
      </ListWrapper>
      <SidebarWrapper>
        <SidebarButton onClick={toggleSidebar}>
          <Icon2 icon={faBars} />
        </SidebarButton>
      </SidebarWrapper>
    </>
  );
};

const SidebarButton = styled.div`
  display: none;
  padding: 7px 10px 5px 10px;
  border: #ffffff solid 1px;
  border-radius: 5px;
  margin: 9px;
  cursor: pointer;
  float: right;
  transition: all 0.2s;
  
  @media (max-width: 1064px) {
    display: inline-block;
  }
`;

const SidebarWrapper = styled.div`
  font-size: 12px;
`;

const ListWrapper = styled.div`
  width: 250px;
  height: 70px;
  float: right;
  
  @media (max-width: 1064px) {
    display: none;
  }
`;

const RightList = styled.ul`
  list-style: none;
  width: 100%;
  height: 70px;
  
  & > li {
    width: 90px;
    height: 70px;
    line-height: 70px;
    float: left;
  }
`;

const GithubList = styled.li`
  width: 70px !important;
`;

const NoStyleA = styled.a`
  display: block;
  color: #FFFFFF;
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
  height: 70px;
  font-weight: 500;
  text-align: center;

  &:hover {
    color: #d0d0d0;
  }
`;

const Icon2 = styled(FontAwesomeIcon)`
  font-size: 10px;
  height: 20px;
`;

const Icon = styled(FontAwesomeIcon)`
  margin: 15px;
`;

export default HeaderRightList;
