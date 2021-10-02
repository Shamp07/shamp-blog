import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import stores from '@stores';
import * as T from '@types';

import styled from '@emotion/styled';

export interface Props {
  data: T.FootPrint;
  modifyId: T.FootPrint['id'];
  size: number;
  setModifyId(id: T.FootPrint['id']): void;
  setFootprint(value: T.FootPrint['content']): void;
  onModify(): void;
}

const FootprintMenu = ({
  data, modifyId, size, setModifyId,
  setFootprint, onModify,
}: Props) => {
  const { signStore, homeStore, utilStore } = stores();
  const { userData } = signStore;
  const { id, userId } = data;

  const isMine = userData?.id === userId;

  if (!isMine) return null;

  const modifyCancel = useCallback(() => {
    setModifyId(0);
  }, []);

  const onDelete = useCallback(() => {
    homeStore.deleteFootprint(id, size);
  }, [size]);

  const onConfirm = useCallback(() => {
    utilStore.openPopup(T.Popup.CONFIRM, '해당 발자취를 삭제하시겠습니까?', onDelete);
  }, []);

  const onModifyMode = useCallback(() => {
    setFootprint(data.content);
    setModifyId(id);
  }, [data.content]);

  if (id === modifyId) {
    return (
      <Root>
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
      </Root>
    );
  }

  return (
    <Root>
      <span
        role="button"
        tabIndex={0}
        onClick={onConfirm}
        onKeyDown={onConfirm}
      >
        삭제
      </span>
      <span
        role="button"
        tabIndex={0}
        onClick={onModifyMode}
        onKeyDown={onModifyMode}
      >
        수정
      </span>
    </Root>
  );
};

const Root = styled.div`
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

export default observer(FootprintMenu);
