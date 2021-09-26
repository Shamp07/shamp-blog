import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

const None = () => (
  <li>
    <NoneWrapper>
      <CommentIcon icon={faCommentDots} />
      <br />
      등록된 댓글이 없습니다.
    </NoneWrapper>
  </li>
);

const NoneWrapper = styled.div`
  text-align: center;
  padding: 32px 0;
  color: #7b858e;
  font-size: 14px;
`;

const CommentIcon = styled(FontAwesomeIcon)`
  width: 30px;
  height: 30px;
  color: #e6e6e6;
  margin-bottom: 15px;
`;

export default None;
