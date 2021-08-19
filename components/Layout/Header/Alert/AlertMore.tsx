import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

import stores from '@stores';

const AlertMore = () => {
  const { alertStore } = stores();
  const { moreAlert } = alertStore;

  return (
    <MenuItem onClick={moreAlert}>
      <span>더 보기</span>
    </MenuItem>
  );
};

export default AlertMore;
