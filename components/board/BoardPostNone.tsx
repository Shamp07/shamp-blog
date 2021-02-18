import React from 'react';
import styled from '@emotion/styled';
import { faPencilRuler } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BoardPostNone = () => (
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
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  height: 100px;
  padding: 180px 0;
  border-radius: 4px;

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

export default BoardPostNone;
