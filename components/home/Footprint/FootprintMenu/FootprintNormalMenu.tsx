import React from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import useStores from '../../../../stores/useStores';
import { RootStore } from '../../../../stores';

interface FootprintNormalMenuProps {
  id: number;
  userId: number;
  content: string;
}

const FootprintNormalMenu = ({ data }: { data: FootprintNormalMenuProps }) => {
  const { HomeStore, SignStore, UtilStore } = useStores() as RootStore;
  const { setModifierFootprintId, deleteFootprint } = HomeStore;
  const { userData } = SignStore;
  const { toggleConfirmModal } = UtilStore;

  const { id, userId, content } = data;

  let isMine: boolean = false;
  const loggedIn = !!userData;

  if (loggedIn) {
    const { id: userIdToken } = userData;
    isMine = userId === userIdToken;
  }

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
