import React from 'react';
import { observer } from 'mobx-react-lite';

import stores from '@stores';

const SelectPopup = () => {
  const { utilStore } = stores();
  const { popup } = utilStore;

  switch (popup) {
    default:
      return null;
  }
};

export default observer(SelectPopup);
