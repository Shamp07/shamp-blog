import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

import stores from '@stores';
import Form from './Form';
import List from './List';

const FOOTPRINT_DEFAULT_SIZE = 10;

const Footprint = () => {
  const { signStore } = stores();
  const { userData } = signStore;

  const info = useLocalObservable(() => ({
    modifyId: 0,
    size: FOOTPRINT_DEFAULT_SIZE,
    setModifyId(id: number) {
      this.modifyId = id;
    },
    increaseSize() {
      this.size += 10;
    },
  }));

  return (
    <>
      {Boolean(userData) && <Form size={info.size} />}
      <List
        size={info.size}
        modifyId={info.modifyId}
        increaseSize={info.increaseSize}
        setModifyId={info.setModifyId}
      />
    </>
  );
};

export default observer(Footprint);
