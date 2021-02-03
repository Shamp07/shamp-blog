import React from 'react';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const FootprintMore: React.FC = () => {
  const { HomeStore } = useStores();
  const { moreFootprint } = HomeStore;

  return (
    <Wrapper onClick={moreFootprint}>
      발자취 더보기
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

export default FootprintMore;
