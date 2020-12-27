import React from 'react';
import styled from 'styled-components';

const Sidebar: React.FC = () => (
  <Wrapper>
    <TopCategory>
      <ul>
        <li className="active">홈</li>
        <li>프로필</li>
        <li>일상</li>
      </ul>
    </TopCategory>
    <BottomCategory>
      <ul>
        <li>전체 글</li>
        <li>인기 글</li>
        <li>JavaScript</li>
        <li>TypeScript</li>
        <li>React</li>
        <li>React Native</li>
        <li>NodeJS</li>
      </ul>
    </BottomCategory>
  </Wrapper>
);

const Wrapper = styled.div`
  display: block;
  width: 300px;
  height: 300px;
  float: left;
  z-index: 1000;
  will-change: min-height;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  @media (max-width: 1064px) {
    display: none;
  }
`;

const Category = styled.div`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .15);
  padding: 7px 0px;

  & > ul {
    list-style: none;
  }

  & > ul > li {
    height: 40px;
    line-height: 40px;
    margin: 4px 0px 4px 15px;
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
      color: #fff;
      background-color: #2d79c7;
      transition: all 0.3s;
    }
  }
`;

const TopCategory = styled(Category)`
  
`;

const BottomCategory = styled(Category)`
  margin-top: 10px;
`;

export default Sidebar;
