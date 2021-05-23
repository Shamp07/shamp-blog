import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import useStores from '@stores/useStores';
import { FootPrintType } from '@stores/HomeStore';

export interface Props {
  data: FootPrintType;
}

const FootprintNormalMenu = ({ data }: Props) => {
  const { HomeStore, SignStore, UtilStore } = useStores();
  const { setModifierFootprintId, deleteFootprint } = HomeStore;
  const { userData } = SignStore;
  const { toggleConfirmModal } = UtilStore;

  const { id, userId, content } = data;

  const isMine = userData?.id === userId;

  return (
    <FootprintMenu>
      {isMine && (
        <>
          <span
            role="button"
            tabIndex={0}
            onClick={() => toggleConfirmModal(
              '해당 발자취를 삭제하시겠습니까?',
              () => deleteFootprint(id),
            )}
            onKeyDown={() => deleteFootprint(id)}
          >
            삭제
          </span>
          <span
            role="button"
            tabIndex={0}
            onClick={() => setModifierFootprintId(id, content)}
            onKeyDown={() => setModifierFootprintId(id, content)}
          >
            수정
          </span>
        </>
      )}
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

export default observer(FootprintNormalMenu);
