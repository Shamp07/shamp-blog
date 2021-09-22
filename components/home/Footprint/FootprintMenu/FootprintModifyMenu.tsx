import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import stores from '@stores';

export interface Props {
  onModify(): void;
}

const FootprintModifyMenu = ({ onModify }: Props) => {
  const { homeStore } = stores();

  const modifyCancel = useCallback(() => {
    homeStore.setModifierFootprintId(0);
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
        onClick={onModify}
        onKeyDown={onModify}
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
