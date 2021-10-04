import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilRuler } from '@fortawesome/free-solid-svg-icons';

const PostNone = () => (
  <Wrapper>
    <div>
      <div>
        <Icon icon={faPencilRuler} />
      </div>
      <div>
        아직 작성된 게시글이 없습니다.
      </div>
    </div>
  </Wrapper>
);

const Wrapper = styled.div`
  background-color: #fff;
  height: 100px;
  padding: 181px 0;
  border-radius: 14px;

  & > div {
    text-align: center;
    color: #7b858e;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: #e6e6e6;
  margin-bottom: 10px;
  width: 50px;
  height: 50px;
`;

export default PostNone;
