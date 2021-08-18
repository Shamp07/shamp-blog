import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import stores from '@stores';

const HeaderNoTokenList = () => {
  const { SignStore } = stores();
  const { toggleSignModal, toggleRegisterModal } = SignStore;

  return (
    <>
      <li>
        <button type="button" onClick={toggleSignModal}>
          <FontAwesomeIcon icon={faSignInAlt} />
        </button>
      </li>
      <li>
        <button type="button" onClick={toggleRegisterModal}>
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      </li>
    </>
  );
};

export default HeaderNoTokenList;
