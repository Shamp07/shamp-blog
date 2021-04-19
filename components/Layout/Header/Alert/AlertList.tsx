import React from 'react';
import { MenuItem } from '@material-ui/core';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { AlertType } from '../../../../stores/AlertStore';
import Alert from './index';
import useStores from '../../../../stores/useStores';
import AlertMore from './AlertMore';
import { RootStore } from '../../../../stores';

const AlertList = () => {
  const { AlertStore } = useStores() as RootStore;
  const { alertList, alertSize } = AlertStore;

  let isMoreAlert = false;
  if (alertList.length && alertList[0].total > alertSize) {
    isMoreAlert = true;
  }

  return (
    <>
      {alertList.length > 0 ? alertList.map((data: AlertType) => (
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
  & > span {
    margin: auto !important;  
  }
`;

export default observer(AlertList);
