import React from 'react';
import styled from 'styled-components';

const Life: React.FC = () => {
  console.log('Life Rendering');
  return (
    <Wrapper>
      일상 페이지(준비중)
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
`;

export default Life;
