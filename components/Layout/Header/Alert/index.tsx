import React, {useCallback} from 'react';
import { useRouter } from 'next/router';
import { MenuItem } from '@material-ui/core';
import styled from '@emotion/styled';

import stores from '@stores';
import * as T from '@types';

interface Props {
  data: T.Alert;
}

const Alert = ({ data }: Props) => {
  const router = useRouter();
  const { alertStore } = stores();
  const { movePost } = alertStore;

  const goPost = useCallback(() => {
    movePost(router, postId, id);
  }, []);

  const {
    id,
    content, postId, readFl, time,
  } = data;

  return (
    <MenuItemCustom onClick={goPost}>
      <MenuItemInner isRead={readFl}>
        <div>
          &quot;
          {content}
          &quot; 라는 내용의 댓글이 달렸습니다.
        </div>
        <MenuItemTime>
          <span>
            {time}
          </span>
        </MenuItemTime>
      </MenuItemInner>
    </MenuItemCustom>
  );
};

interface MenuItemInnerProps {
  isRead: boolean;
}

const MenuItemCustom = styled(MenuItem)`
  white-space: normal;
  border-bottom: 1px solid #e6e6e6 !important;
`;

const MenuItemInner = styled.div<MenuItemInnerProps>(({ isRead }) => ({
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

const MenuItemTime = styled.div`
  display: flex;
  & > span {
    margin-left: auto;
  }
`;

export default Alert;
