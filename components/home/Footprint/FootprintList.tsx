import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import FootprintMore from './FootprintMore';
import FootPrintRow from './FootprintRow';
import FootprintNone from './FootprintNone';

const FootprintList = () => {
  const { homeStore } = stores();
  const { footprintList, footprintSize } = homeStore;

  const isMoreFootprint = footprintList[0]?.total > footprintSize;

  const footprints = useMemo(() => (
    footprintList.length ? footprintList.map(
      (data) => <FootPrintRow data={data} key={data.id} />,
    ) : <FootprintNone />
  ), [footprintList]);

  return (
    <FootprintListWrapper>
      <ul>
        {footprints}
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
