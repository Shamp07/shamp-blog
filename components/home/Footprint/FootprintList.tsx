import React from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import useStores from '@stores/useStores';
import FootprintMore from './FootprintMore';
import FootPrintRow from './FootprintRow';
import FootprintNone from './FootprintNone';

const FootprintList = () => {
  const { HomeStore } = useStores();
  const { footprintList, footprintSize } = HomeStore;

  const isMoreFootprint = footprintList.length && footprintList[0].total > footprintSize;

  return (
    <FootprintListWrapper>
      <ul>
        {footprintList.length ? footprintList.map(
          (data) => <FootPrintRow data={data} key={data.id} />,
        ) : <FootprintNone />}
        {isMoreFootprint && <FootprintMore />}
      </ul>
    </FootprintListWrapper>
  );
};

const FootprintListWrapper = styled.div`
  margin-top: 15px;
  max-height: 500px;
  overflow: auto;
  
  & > ul {
    list-style: none;
  }

  & > ul > li {
    padding: 10px 0;
    border-bottom: 1px solid #e6e6e6;
  }

  &::-webkit-scrollbar {
    width: 10px;
    height: 6px;
    background: transparent;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2d79c7;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #ebeef1;;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export default observer(FootprintList);
