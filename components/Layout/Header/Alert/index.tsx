import React from 'react';
import { MenuItem } from '@material-ui/core';
import styled from '@emotion/styled';
import { AlertType } from '../../../../stores/AlertStore';

interface AlertProps {
  data: AlertType;
}

const Alert = ({ data }: AlertProps) => {
  const {
    content, postId, readFl, time,
  } = data;

  return (
    <MenuItemCustom>
      <MenuItemInner href={`/post/${postId}`} isRead={readFl}>
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
`;

const MenuItemInner = styled.a<MenuItemInnerProps>`
  display: block;
  width: 100%;
  font-weight: 300;
  font-size: 15px;
  word-break: break-all;
  text-decoration: none;
  color: ${(props) => (props.isRead ? '#e6e6e6' : '#000')};
`;

const MenuItemTime = styled.div`
  display: flex;
  & > span {
    margin-left: auto;
  }
`;

export default Alert;
