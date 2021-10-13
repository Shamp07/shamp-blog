import React, { useCallback, Dispatch, SetStateAction } from 'react';
import MenuItem from '@material-ui/core/MenuItem';

import stores from '@stores';

interface Props {
  size: number;
  setSize: Dispatch<SetStateAction<number>>
}

const More = ({ size, setSize }: Props) => {
  const { alertStore } = stores();

  const onMore = useCallback(() => {
    setSize((prev) => prev + 10);
    alertStore.getAlerts(size);
  }, [size]);

  return (
    <MenuItem onClick={onMore}>
      <span>더 보기</span>
    </MenuItem>
  );
};

export default More;
