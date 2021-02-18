import React from 'react';
import styled from '@emotion/styled';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderSidebarButton from './HeaderSidebarButton';
import HeaderTokenMenu from './HeaderTokenMenu';

const HeaderRightList = () => (
  <>
    <ListWrapper>
      <RightList>
        <HeaderTokenMenu />
        <GithubList>
          <NoStyleA href="https://github.com/Shamp07">
            <Icon icon={faGithub} />
          </NoStyleA>
        </GithubList>
      </RightList>
    </ListWrapper>
    <HeaderSidebarButton />
  </>
);

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

const Icon = styled(FontAwesomeIcon)`
  margin: 15px;
`;

export default HeaderRightList;
