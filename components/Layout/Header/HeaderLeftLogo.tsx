import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

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

const ResponsiveLogo = styled.span`
  display: inline-block;
  width: 70px;
  height: 70px;
  background-image: url("/logo.png");
  background-size: 70px;
  @media (max-width: 1064px) {
    background-size: 56px;
    width: 56px !important;
    height: 56px !important;
  }
`;

const ListWrapper = styled.div`
  width: 250px;
  height: 70px;
  float: left;
  @media (max-width: 1064px) {
    height: 56px !important;
    width: 200px;
  }
`;

const RightList = styled.ul`
  list-style: none;
  width: 100%;
  height: 70px;
  @media (max-width: 1064px) {
    height: 56px !important;
  }

  & > li {
    height: 70px;
    line-height: 70px;
    float: left;
    @media (max-width: 1064px) {
      height: 56px !important;
      line-height: 56px !important;
    }
  }
`;

const NoStyleSpan = styled.span`
  display: block;
  color: #ffffff;  
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
  height: 70px;
  font-weight: 500;
  text-align: center;
  
  @media (max-width: 1064px) {
    height: 56px !important;
  }
`;

const NoStyleLogo = styled(NoStyleSpan)`
  font-size: 30px;
  line-height: 70px;
  width: 175px;
  color: #fff;

  @media (max-width: 1064px) {
    text-align: left !important;
    font-size: 25px;
    line-height: 56px !important;
    height: 56px !important;
    width: 140px;
  }
`;

export default HeaderLeftLogo;
