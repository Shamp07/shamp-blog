import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import * as T from '@types';
import More from './More';
import Row from './Row';
import None from './None';

interface Props {
  size: number;
  modifyId: T.FootPrint['id'];
  increaseSize(): void;
  setModifyId(id: T.FootPrint['id']): void;
}

const List = ({
  size, modifyId, increaseSize, setModifyId,
}: Props) => {
  const { homeStore } = stores();
  const { footprints } = homeStore;

  const isMoreFootprint = footprints[0]?.total > size;

  const footprintList = useMemo(() => (
    footprints.length ? footprints.map((data) => (
      <Row
        key={data.id}
        data={data}
        size={size}
        modifyId={modifyId}
        setModifyId={setModifyId}
      />
    )) : <None />
  ), [footprints, size, modifyId]);

  return (
    <Root>
      <ul>
        {footprintList}
        {isMoreFootprint && <More increaseSize={increaseSize} />}
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
