import React, { CSSProperties } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import Button from '@atoms/Button';
import { Page } from '@utilities/route';

const Done = () => (
  <div>
    <Title>회원가입 완료</Title>
    <Description>
      회원가입이 정상적으로 완료되었습니다.
      <br />
      <br />
      아래의 버튼을 눌러 로그인 해보세요!
    </Description>
    <Link href={Page.SIGN_IN}>
      <Button
        customStyles={signInButtonStyles}
        variant="contained"
      >
        로그인 하러가기
      </Button>
    </Link>
  </div>
);

const Title = styled.h1({
  marginBottom: '1rem',
  textAlign: 'center',
});

const Description = styled.div({
  fontSize: '.875rem',
  margin: '30px 0',
  textAlign: 'center',
});

const signInButtonStyles: CSSProperties = {
  width: '100%',
  fontSize: '.9rem',
  padding: '.9rem',
};

export default Done;
