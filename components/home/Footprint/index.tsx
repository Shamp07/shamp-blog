import React from 'react';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import FootprintWrite from './FootprintWrite';
import FootprintList from './FootprintList';

const Footprint = () => {
  const { signStore } = stores();
  const { userData } = signStore;

  return (
    <div>
      {Boolean(userData) && <FootprintWrite />}
      <FootprintList />
    </div>
  );
};

export default observer(Footprint);
