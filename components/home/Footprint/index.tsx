import React from 'react';
import { observer } from 'mobx-react-lite';
import useStores from '../../../stores/useStores';
import FootprintWrite from './FootprintWrite';
import FootprintList from './FootprintList';
import { RootStore } from '../../../stores';

const Footprint = () => {
  const { SignStore } = useStores() as RootStore;
  const { userData } = SignStore;
  const loggedIn = !!userData;

  return (
    <div>
      {loggedIn && <FootprintWrite />}
      <FootprintList />
    </div>
  );
};

export default observer(Footprint);
