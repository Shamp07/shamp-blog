import React from 'react';
import styled from 'styled-components';
import Link from 'next/Link';

const HeaderLeftLogo: React.FC = () => (
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
  background-image: url("./logo.png");
  @media (max-width: 1064px) {
    background-image: url("/logo_54x54.png");
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
  & > span {
    display: inline-block;
    height: 70px;
    width: 70px;
  }
  
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
  }
`;

export default HeaderLeftLogo;
