import React from 'react';
import styled from '@emotion/styled';

interface Props {
  increaseSize(): void;
}

const More = ({ increaseSize }: Props) => (
  <Root onClick={increaseSize}>
    발자취 더보기
  </Root>
);

const Root = styled.div`
  margin-top: 8px;
  text-align: center;
  background-color: #fff;
  min-height: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #7b858e;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export default More;
