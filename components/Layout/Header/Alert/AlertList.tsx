import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { MenuItem } from '@material-ui/core';

import stores from '@stores';
import Alert from '.';
import AlertMore from './AlertMore';

const AlertList = () => {
  const { alertStore } = stores();
  const { list, size } = alertStore;

  const isMoreAlert = list[0]?.total > size;

  const alerts = useMemo(() => (list.length ? (
    list.map((data) => (
      <Alert key={data.id} data={data} />
    ))) : (
      <MenuItemNone>
        <span>알림이 없습니다.</span>
      </MenuItemNone>
  )), [list]);

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
