import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import stores from '@stores';

const HeaderNoTokenList = () => {
  const { signStore } = stores();

  const toggleSignIn = useCallback(() => {
    signStore.toggleSignModal();
  }, []);

  const toggleSignUp = useCallback(() => {
    signStore.toggleRegisterModal();
  }, []);

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
