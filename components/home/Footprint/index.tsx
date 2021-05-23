import React from 'react';
import { observer } from 'mobx-react-lite';

import useStores from '@stores/useStores';
import FootprintWrite from './FootprintWrite';
import FootprintList from './FootprintList';

const Footprint = () => {
  const { SignStore } = useStores();
  const { userData } = SignStore;

  return (
    <div>
      {Boolean(userData) && <FootprintWrite />}
      <FootprintList />
    </div>
  );
};

export default observer(Footprint);
