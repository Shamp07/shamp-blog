import React from 'react';
import { observer } from 'mobx-react-lite';
import FootprintNormalMenu from './FootprintNormalMenu';
import FootprintModifyMenu from './FootprintModifyMenu';
import useStores from '../../../../stores/useStores';

interface FootprintMenuProp {
  data: FootprintRowInterface;
}

export interface FootprintRowInterface {
  id: number,
  userId: number,
  userName: string,
  content: string,
  time: string,
  modifiedTime: string,
}

const FootprintMenu: React.FC<FootprintMenuProp> = ({ data }: FootprintMenuProp) => {
  const { HomeStore } = useStores();
  const { modifierFootprintId } = HomeStore;
  const { id } = data;

  return id === modifierFootprintId
    ? <FootprintModifyMenu /> : <FootprintNormalMenu data={data} />;
};

export default observer(FootprintMenu);
