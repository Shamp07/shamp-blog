import React from "react";
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
const logo = require('../../../resources/images/logo.png').default;

const Header: React.FC = () => (
    <HeaderTopBar>
      <Container maxWidth="lg">
        <Link to="/">
          <Logo src={logo} />
        </Link>
        <RightList>
          <li>
            <NoStyleA href="https://github.com/shamp07">
              <Icon icon={faGithub} />
            </NoStyleA>
          </li>
        </RightList>
      </Container>
    </HeaderTopBar>
);

const HeaderTopBar = styled.div`
  height: 70px;
  background-color: #2D79C7;
  color: #FFFFFF;
`;

const RightList = styled.ul`
  list-style: none;
  float: right;
`;

const NoStyleA = styled.a`
  color: #FFFFFF;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 38px;
`;

const Logo = styled.img`
  height: 70px;
`;

export default Header;
