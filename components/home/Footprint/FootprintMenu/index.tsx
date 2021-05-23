import React from 'react';
import { observer } from 'mobx-react-lite';

import useStores from '@stores/useStores';
import FootprintModifyMenu from './FootprintModifyMenu';
import FootprintNormalMenu, { Props } from './FootprintNormalMenu';

const FootprintMenu = ({ data }: Props) => {
  const { HomeStore } = useStores();
  const { modifierFootprintId } = HomeStore;
  const { id } = data;

  return id === modifierFootprintId
    ? <FootprintModifyMenu /> : <FootprintNormalMenu data={data} />;
};

export default observer(FootprintMenu);
