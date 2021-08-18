import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { MenuItem } from '@material-ui/core';

import stores from '@stores';
import Alert from '.';
import AlertMore from './AlertMore';

const AlertList = () => {
  const { AlertStore } = stores();
  const { alertList, alertSize } = AlertStore;

  const isMoreAlert = alertList[0]?.total > alertSize;

  const alerts = useMemo(() => (alertList.length ? (
    alertList.map((data) => (
      <Alert key={data.id} data={data} />
    ))) : (
      <MenuItemNone>
        <span>알림이 없습니다.</span>
      </MenuItemNone>
  )), [alertList]);

  return (
    <>
      {alerts}
      {isMoreAlert && <AlertMore />}
    </>
  );
};

const MenuItemNone = styled(MenuItem)`
  font-size: 14px !important;
  text-align: center;
  cursor: default !important;

  & > span {
    padding: 10px 0;
  }
`;

export default observer(AlertList);
