import styled from '@emotion/styled';
import React from 'react';

const ReceiveMessage = () => (
  <Wrapper>
    <Profile />
    <MessageWrapper>

    </MessageWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  margin-top: 13px;
  display: flex;
`;

const Profile = styled.div`
  width: 40px;
  padding-left: 10px;
`;

const MessageWrapper = styled.div`
  flex: 1 1 0;
  overflow: hidden;
`;

export default ReceiveMessage;
