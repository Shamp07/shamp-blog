import React, { useMemo } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import More from './More';
import Row from './Row';
import None from './None';

const List = () => {
  const { commentStore } = stores();
  const { comments, size } = commentStore;



  const isMoreComment = comments[0]?.total > size;

  const list = useMemo(() => (
    comments.length ? comments.map(
      (data) => <Row data={data} key={data.id} />,
    ) : <None />
  ), [comments]);

  return (
    <Root>
      <ul>
        {list}
        {isMoreComment && <More />}
      </ul>
    </Root>
  );
};

const Root = styled.div`
  & > ul {
    list-style: none;
  }
`;

export default observer(List);
