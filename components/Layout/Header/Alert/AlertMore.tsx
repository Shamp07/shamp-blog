import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import useStores from '../../../../stores/useStores';
import { RootStore } from '../../../../stores';

const AlertMore = () => {
  const { AlertStore } = useStores() as RootStore;
  const { moreAlert } = AlertStore;

  return (
    <MenuItem onClick={moreAlert}>
      <span>더 보기</span>
    </MenuItem>
  );
};

export default AlertMore;
