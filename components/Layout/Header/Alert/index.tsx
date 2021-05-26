import React from 'react';
import { useRouter } from 'next/router';
import { MenuItem } from '@material-ui/core';
import styled from '@emotion/styled';

import useStores from '@stores/useStores';
import { AlertType } from '@stores/AlertStore';

interface Props {
  data: AlertType;
}

const Alert = ({ data }: Props) => {
  const router = useRouter();
  const { AlertStore } = useStores();
  const { movePost } = AlertStore;

  const {
    id,
    content, postId, readFl, time,
  } = data;

  return (
    <MenuItemCustom onClick={() => movePost(router, postId, id)}>
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

const MenuItemInner = styled.div<MenuItemInnerProps>`
  display: block;
  width: 100%;
  font-weight: 300;
  font-size: 15px;
  word-break: break-all;
  text-decoration: none;
  color: ${(props) => (props.isRead ? '#C1C1C1' : '#000')} !important;
`;

const MenuItemTime = styled.div`
  display: flex;
  & > span {
    margin-left: auto;
  }
`;

export default Alert;
