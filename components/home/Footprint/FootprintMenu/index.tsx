import React from 'react';
import { observer } from 'mobx-react-lite';

import useStores from '@stores/useStores';
import FootprintModifyMenu from './FootprintModifyMenu';
import FootprintNormalMenu, { Props } from './FootprintNormalMenu';

const FootprintMenu = ({ data }: Props) => {
  const { HomeStore, SignStore } = useStores();
  const { modifierFootprintId } = HomeStore;
  const { userData } = SignStore;
  const { id, userId } = data;
  const isMine = userData?.id === userId;

  if (!isMine) return null;

  return id === modifierFootprintId
    ? <FootprintModifyMenu /> : <FootprintNormalMenu data={data} />;
};

export default observer(FootprintMenu);
