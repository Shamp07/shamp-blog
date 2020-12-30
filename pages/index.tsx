import React from 'react';
import { observer } from 'mobx-react';
import useStores from '../stores/useStores';

const CountPage = observer(() => {
  const { SidebarStore } = useStores();
  return (
    <div>
      <button type="button" onClick={SidebarStore.plusCount}>+</button>
      {SidebarStore.count}
    </div>
  );
});

export default CountPage;
