import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import More from './More';
import FootPrintRow from './Row';
import FootprintNone from './None';

const List = () => {
  const { homeStore } = stores();
  const { footprints } = homeStore;

  const isMoreFootprint = footprints[0]?.total > size;

  const footprintList = useMemo(() => (
    footprints.length ? footprints.map(
      (data) => <FootPrintRow data={data} key={data.id} />,
    ) : <FootprintNone />
  ), [footprints]);

  return (
    <Root>
      <ul>
        {footprintList}
        {isMoreFootprint && <More />}
      </ul>
    </Root>
  );
};

const Root = styled.div`
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

export default observer(List);
