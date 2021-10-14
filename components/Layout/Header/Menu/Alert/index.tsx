import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { MenuItem } from '@material-ui/core';

import stores from '@stores';
import Row from './Row';
import More from './More';

const Alert = () => {
  const { alertStore } = stores();
  const { alerts } = alertStore;

  const [size, setSize] = useState(10);
  const isMoreAlert = alerts[0]?.total > size;

  const alertList = useMemo(() => (alerts.length ? (
    alerts.map((data) => (
      <Row key={data.id} data={data} />
    ))) : (
      <None>
        <span>알림이 없습니다.</span>
      </None>
  )), [alerts]);

  return (
    <>
      {alertList}
      {isMoreAlert && <More size={size} setSize={setSize} />}
    </>
  );
};

const None = styled(MenuItem)`
  font-size: 14px !important;
  text-align: center;
  cursor: default !important;

  & > span {
    padding: 10px 0;
  }
`;

export default observer(Alert);
