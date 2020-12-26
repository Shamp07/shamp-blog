import React from 'react';
import styled from 'styled-components';
import Link from 'next/Link';
import Image from 'next/Image';

const HeaderLeftLogo: React.FC = () => (
  <ListWrapper>
    <RightList>
      <li>
        <NoStyleA>
          <Link href="/">
            <span>
              <Image
                src="/logo.png"
                width={70}
                height={70}
              />
            </span>
          </Link>
        </NoStyleA>
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

const ListWrapper = styled.div`
  width: 250px;
  height: 70px;
  float: left;
`;

const RightList = styled.ul`
  list-style: none;
  width: 100%;
  height: 70px;

  & > li {
    height: 70px;
    line-height: 70px;
    float: left;
  }
`;

const NoStyleA = styled.a`
  display: block;
  color: #ffffff !important;  
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
  height: 70px;
  font-weight: 500;
  text-align: center;

  &:hover {
    color: #d0d0d0;
  }
`;

const NoStyleLogo = styled(NoStyleA)`
  font-size: 30px;
  line-height: 70px;
  width: 175px;
`;

export default HeaderLeftLogo;
