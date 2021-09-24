import React, { useState, useCallback } from 'react';
import MenuItem from '@material-ui/core/MenuItem';

import stores from '@stores';

const AlertMore = () => {
  const { alertStore } = stores();

  const [size, setSize] = useState(10);

  const onMore = useCallback(() => {
    setSize((prev) => prev + 10);
    alertStore.getAlertList(size);
  }, [size]);

  return (
    <MenuItem onClick={onMore}>
      <span>더 보기</span>
    </MenuItem>
  );
};

export default AlertMore;
