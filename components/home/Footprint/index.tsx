import React from 'react';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import FootprintWrite from './FootprintWrite';
import FootprintList from './FootprintList';

const Footprint = () => {
  const { SignStore } = stores();
  const { userData } = SignStore;

  return (
    <div>
      {Boolean(userData) && <FootprintWrite />}
      <FootprintList />
    </div>
  );
};

export default observer(Footprint);
