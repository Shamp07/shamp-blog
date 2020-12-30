import React from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import useStores from '../../stores/useStores';

const Board: React.FC = () => {
  const { SidebarStore } = useStores();

  return (
    <div>
      <button type="button" onClick={SidebarStore.plusCount}>+</button>
      {SidebarStore.count}
    </div>
  );
};

export default Board;
