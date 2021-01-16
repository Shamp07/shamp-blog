import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

const CommentList: React.FC = () => (
  <CommentListWrapper>
    <ul>
      <li>
        <CommentWrapper isReply={false}>
          <CommentWriter>
            <span>작성자</span>
            <span>25 분 전</span>
          </CommentWriter>
          <CommentContent>내용</CommentContent>
          <CommentMenu>
            <ReplyIcon icon={faReply} />
            답글 쓰기
          </CommentMenu>
        </CommentWrapper>
      </li>
      <li>
        <CommentWrapper isReply>
          <ReplyBorder />
          <CommentWriter>
            <span>작성자</span>
            <span>25 분 전</span>
          </CommentWriter>
          <CommentContent>내용</CommentContent>
          <CommentMenu>
            <ReplyIcon icon={faReply} />
            답글 쓰기
          </CommentMenu>
        </CommentWrapper>
      </li>
    </ul>
  </CommentListWrapper>
);

interface CommentInterface {
  isReply: boolean;
}

const CommentListWrapper = styled.div`
  & > ul {
    list-style: none;
  }
`;

const ReplyBorder = styled.div`
  position: absolute;
  top: 13px;
  left: 35px;
  content: "";
  width: 12px;
  height: 12px;
  z-index: 1000;
  border-left: 1px solid #c5cbd0;
  border-bottom: 1px solid #c5cbd0;
`;

const CommentWrapper = styled.div<CommentInterface>`
  position: relative;
  padding: ${(props) => (props.isReply ? '12px 12px 12px 64px' : '12px')};
  background-color: ${(props) => (props.isReply ? '#f8f9fa' : '#ffffff')};
`;

const CommentWriter = styled.div`
  line-height: 17px;
  font-weight: 700;
  color: #1e2022;
  
  & > span {
    padding: 0 10px;
  }

  & > span:first-child {
    padding-left: 0;
  }
  
  & > span:last-child {
    font-size: 14px;
    color: #7b858e;
    font-weight: normal;
    border-left: 1px solid #e6e6e6;
  }
`;

const CommentContent = styled.div`
  margin-top: 8px;
  line-height: 20px;
  font-size: 14px;
  color: #1e2022;
  word-wrap: break-word;
  word-break: break-all;
`;

const CommentMenu = styled.div`
  margin-top: 8px;
  color: #7b858e;
  font-size: 14px;
`;

const ReplyIcon = styled(FontAwesomeIcon)`
  width: 13px;
  height: 13px;
  margin-right: 5px;
`;

export default CommentList;
