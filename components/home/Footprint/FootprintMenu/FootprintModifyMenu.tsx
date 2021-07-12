import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import useStores from '@stores/useStores';

const FootprintModifyMenu = () => {
  const { HomeStore } = useStores();
  const { modifierFootprintId, setModifierFootprintId, modifyFootprint } = HomeStore;

  const modifyCancel = useCallback(() => {
    setModifierFootprintId(0, '');
  }, []);

  const modify = useCallback(() => {
    modifyFootprint(modifierFootprintId);
  }, []);

  return (
    <FootprintMenu>
      <span
        role="button"
        tabIndex={0}
        onClick={modifyCancel}
        onKeyDown={modifyCancel}
      >
        취소
      </span>
      <span
        role="button"
        tabIndex={0}
        onClick={modify}
        onKeyDown={modify}
      >
        수정
      </span>
    </FootprintMenu>
  );
};

const FootprintMenu = styled.div`
  margin-top: 8px;
  font-size: 14px;
  
  & > span {
    margin-right: 10px;
    cursor: pointer;
  }
  
  & > span:first-of-type {
    color: #dc143c;
    margin-right: 10px;
  }
  
  & > span:last-child {
    color: #7b858e;
  }
`;

export default FootprintModifyMenu;
