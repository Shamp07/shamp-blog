import React from 'react';
import styled from '@emotion/styled';
import useStores from '../../../../stores/useStores';

const FootprintModifyMenu: React.FC = () => {
  const { HomeStore } = useStores();
  const { modifierFootprintId, setModifierFootprintId, modifyFootprint } = HomeStore;

  return (
    <FootprintMenu>
      <span
        role="button"
        tabIndex={0}
        onClick={() => setModifierFootprintId(0, '')}
        onKeyDown={() => setModifierFootprintId(0, '')}
      >
        취소
      </span>
      <span
        role="button"
        tabIndex={0}
        onClick={() => modifyFootprint(modifierFootprintId)}
        onKeyDown={() => modifyFootprint(modifierFootprintId)}
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
