import React from 'react';
import { MenuItem } from '@material-ui/core';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { AlertType } from '../../../../stores/AlertStore';
import Alert from './index';
import useStores from '../../../../stores/useStores';

const AlertList = () => {
  const { AlertStore } = useStores();
  const { alertList } = AlertStore;
  return (
    <>
      {alertList.length > 0 ? alertList.map((data: AlertType) => (
        <Alert key={data.id} data={data} />
      )) : (
        <MenuItemNone>
          <span>알림이 없습니다.</span>
        </MenuItemNone>
      )}
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
