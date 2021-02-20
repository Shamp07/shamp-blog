import React from 'react';
import styled from '@emotion/styled';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderSidebarButton from './HeaderSidebarButton';
import HeaderTokenMenu from './HeaderTokenMenu';

const HeaderRightList = () => (
  <Wrapper>
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
  </Wrapper>
);

const Wrapper = styled.div`
  display: inline-flex;
  margin-left: auto;
`;

const ListWrapper = styled.div`
  display: inline-block;
  width: 250px;
  height: 70px;
  
  @media (max-width: 1064px) {
    display: none;
  }
`;

const RightList = styled.ul`
  list-style: none;
  display: inline-flex;
  width: 100%;
  height: 70px;
  
  & > li {
    width: 90px;
    height: 70px;
    line-height: 70px;
    display: inline-block;
    text-align: center;
  }
`;

const GithubList = styled.li`
  width: 70px !important;
`;

const NoStyleA = styled.a`
  display: inline;
  width: 40px;
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
  margin: 14px;
`;

export default HeaderRightList;
