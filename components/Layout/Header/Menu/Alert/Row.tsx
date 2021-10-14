import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { MenuItem as RowMenuItem } from '@material-ui/core';
import styled from '@emotion/styled';

import stores from '@stores';
import * as T from '@types';

interface Props {
  data: T.Alert;
}

const Alert = ({ data }: Props) => {
  const router = useRouter();
  const { alertStore } = stores();

  const goPost = useCallback(() => {
    alertStore.readAlert(id);
    router.push(`/post/${postId}`);
  }, []);

  const {
    id,
    content, postId, readFl, time,
  } = data;

  return (
    <MenuItem onClick={goPost}>
      <MenuItemInner isRead={readFl}>
        <div>
          &quot;
          {content}
          &quot; 라는 내용의 댓글이 달렸습니다.
        </div>
        <Time>
          <span>
            {time}
          </span>
        </Time>
      </MenuItemInner>
    </MenuItem>
  );
};

const MenuItem = styled(RowMenuItem)`
  white-space: normal;
  border-bottom: 1px solid #e6e6e6 !important;
`;

const MenuItemInner = styled.div<{ isRead: boolean }>(({ isRead }) => ({
  display: 'block',
  width: '100%',
  fontWeight: 300,
  fontSize: '15px',
  wordBreak: 'break-all',
  textDecoration: 'none',
  '&&&': {
    color: isRead ? '#C1C1C1' : '#000',
  },
}));

const Time = styled.div`
  display: flex;
  & > span {
    margin-left: auto;
  }
`;

export default Alert;
