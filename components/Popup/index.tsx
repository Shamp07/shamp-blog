import React from 'react';
import { observer } from 'mobx-react-lite';

import * as T from '@types';
import stores from '@stores';
import ConfirmPopup from '@components/Popup/ConfirmPopup';

const Popup = () => {
  const { utilStore } = stores();
  const { popup } = utilStore;

  return (() => {
    switch (popup.type) {
      case T.PopupType.CONFIRM:
        return <ConfirmPopup />;
      default:
        return null;
    }
  })();
};

export default observer(Popup);
