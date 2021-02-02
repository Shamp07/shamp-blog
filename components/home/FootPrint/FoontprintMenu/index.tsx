import React from 'react';
import { observer } from 'mobx-react-lite';
import CommentNormalMenu from './FootprintNormalMenu';
import FootprintModifyMenu from './FootprintModifyMenu';
import useStores from '../../../../stores/useStores';

export interface FootprintRowInterface {
  id: number,
  userId: number,
  userName: string,
  content: string,
  time: string,
  modifiedTime: string,
  isTag: boolean,
}

const FootprintMenu = ({ data }: { data: FootprintRowInterface }) => {
  const { HomeStore } = useStores();
  const { modifierFootprintId } = HomeStore;
  const { id } = data;

  return id === modifierFootprintId
    ? <FootprintModifyMenu data={data} /> : <CommentNormalMenu data={data} />;
};

export default observer(FootprintMenu);
