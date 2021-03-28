import React from 'react';
import { MenuItem } from '@material-ui/core';
import styled from '@emotion/styled';
import { AlertType } from '../../../../stores/AlertStore';

interface AlertProps {
  data: AlertType;
}

const Alert = ({ data }: AlertProps) => {
  const {
    alertId,
    content, postId, readFl, time,
  } = data;
  return (
    <MenuItemCustom>
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
`;

const MenuItemInner = styled.div<MenuItemInnerProps>`
  width: 300px;
  font-size: 15px;
  word-break: break-all;
  color: ${(props) => (props.isRead ? '#e6e6e6' : '#000')};
`;

const MenuItemTime = styled.div`
  display: flex;
  & > span {
    margin-left: auto;
  }
`;

export default Alert;
