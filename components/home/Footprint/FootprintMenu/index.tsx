import React from 'react';
import { observer } from 'mobx-react-lite';
import FootprintNormalMenu, { FootprintDataProps } from './FootprintNormalMenu';
import FootprintModifyMenu from './FootprintModifyMenu';
import useStores from '../../../../stores/useStores';
import { RootStore } from '../../../../stores';

const FootprintMenu = ({ data }: FootprintDataProps) => {
  const { HomeStore } = useStores() as RootStore;
  const { modifierFootprintId } = HomeStore;
  const { id } = data;

  return id === modifierFootprintId
    ? <FootprintModifyMenu /> : <FootprintNormalMenu data={data} />;
};

export default observer(FootprintMenu);
