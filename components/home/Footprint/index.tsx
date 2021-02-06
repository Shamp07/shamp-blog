import React from 'react';
import { observer } from 'mobx-react-lite';
import useStores from '../../../stores/useStores';
import FootprintWrite from './FootprintWrite';
import FootprintList from './FootprintList';

const Footprint: React.FC = () => {
  const { SignStore } = useStores();
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
