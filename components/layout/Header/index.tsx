import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import useStores from '../../../stores/useStores';

const Index: React.FC = () => {
  const { TestStore } = useStores();
  const { testPrint } = TestStore;
  testPrint();

  return (
    <HeaderTopBar>
      <Container maxWidth="lg">
        <Image
          src="/logo.png"
          alt="Logo"
          width={70}
          height={70}
        />
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
};

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

export default Index;
