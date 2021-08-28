import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import stores from '@stores';

const HeaderNoTokenList = () => {
  const { signStore } = stores();

  const toggle = useCallback(() => {
    signStore.toggleSignModal();
  }, []);

  return (
    <>
      <li>
        <button type="button" onClick={toggle}>
          <FontAwesomeIcon icon={faSignInAlt} />
        </button>
      </li>
      <li>
        <button type="button" onClick={toggle}>
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      </li>
    </>
  );
};

export default HeaderNoTokenList;
