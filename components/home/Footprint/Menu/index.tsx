import React from 'react';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import * as T from '@types';
import ModifyMenu from './ModifyMenu';
import FootprintNormalMenu from './NormalMenu';

export interface Props {
  data: T.FootPrint;
  setFootprint(value: T.FootPrint['content']): void;
  onModify(): void;
}

const FootprintMenu = ({ data, setFootprint, onModify }: Props) => {
  const { homeStore, signStore } = stores();
  const { modifierFootprintId } = homeStore;
  const { userData } = signStore;
  const { id, userId } = data;
  const isMine = userData?.id === userId;

  if (!isMine) return null;
  if (id === modifierFootprintId) return <ModifyMenu onModify={onModify} />;

  return <FootprintNormalMenu data={data} setFootprint={setFootprint} />;
};

export default observer(FootprintMenu);
