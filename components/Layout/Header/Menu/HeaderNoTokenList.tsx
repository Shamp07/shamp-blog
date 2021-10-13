import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import stores from '@stores';
import * as T from '@types';

const HeaderNoTokenList = () => {
  const { utilStore } = stores();

  const toggleSignIn = () => utilStore.openPopup(T.Popup.SIGN_IN);
  const toggleSignUp = () => utilStore.openPopup(T.Popup.SIGN_UP);

  return (
    <>
      <li>
        <button type="button" onClick={toggleSignIn}>
          <FontAwesomeIcon icon={faSignInAlt} />
        </button>
      </li>
      <li>
        <button type="button" onClick={toggleSignUp}>
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      </li>
    </>
  );
};

export default HeaderNoTokenList;
