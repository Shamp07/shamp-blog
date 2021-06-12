import React from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { MenuItem } from '@material-ui/core';

import { AlertType } from '@stores/AlertStore';
import useStores from '@stores/useStores';
import Alert from '.';
import AlertMore from './AlertMore';

const AlertList = () => {
  const { AlertStore } = useStores();
  const { alertList, alertSize } = AlertStore;

  const isMoreAlert = alertList[0]?.total > alertSize;

  return (
    <>
      {alertList.length ? alertList.map((data: AlertType) => (
        <Alert key={data.id} data={data} />
      )) : (
        <MenuItemNone>
          <span>알림이 없습니다.</span>
        </MenuItemNone>
      )}
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
