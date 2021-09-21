import React from 'react';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import * as T from '@types';
import FootprintModifyMenu from './FootprintModifyMenu';
import FootprintNormalMenu from './FootprintNormalMenu';

export interface Props {
  data: T.FootPrint;
  value: T.FootPrint['content'];
  setFootprint(value: T.FootPrint['content']): void;
}

const FootprintMenu = ({ data, value, setFootprint }: Props) => {
  const { homeStore, signStore } = stores();
  const { modifierFootprintId } = homeStore;
  const { userData } = signStore;
  const { id, userId } = data;
  const isMine = userData?.id === userId;

  if (!isMine) return null;
  if (id === modifierFootprintId) return <FootprintModifyMenu value={value} />;

  return <FootprintNormalMenu data={data} setFootprint={setFootprint} />;
};

export default observer(FootprintMenu);
