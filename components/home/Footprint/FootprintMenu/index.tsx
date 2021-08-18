import React from 'react';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import FootprintModifyMenu from './FootprintModifyMenu';
import FootprintNormalMenu, { Props } from './FootprintNormalMenu';

const FootprintMenu = ({ data }: Props) => {
  const { homeStore, signStore } = stores();
  const { modifierFootprintId } = homeStore;
  const { userData } = signStore;
  const { id, userId } = data;
  const isMine = userData?.id === userId;

  if (!isMine) return null;

  return id === modifierFootprintId
    ? <FootprintModifyMenu /> : <FootprintNormalMenu data={data} />;
};

export default observer(FootprintMenu);
