import React, { ChangeEvent, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { useMutation } from 'react-query';
import axios from 'axios';

import TextField from '@atoms/TextField';
import styled from '@emotion/styled';
import dsPalette from '@constants/ds-palette';

interface Props {
  email: string;
}

const EmailVerify = ({ email }: Props) => {
  const form = useLocalObservable(() => ({
    values: {
      code: '',
    },
    onChange(event: ChangeEvent<HTMLInputElement>) {
      this.values.code = event.target.value;
    },
  }));

  const mutation = useMutation(() => axios.put('/api/user/verify', { email }));

  useEffect(() => {
    // mutation.mutate();
  }, []);

  return (
    <Root>
      <Inner>
        <Title>이메일 인증</Title>
        <Description>입력하신 이메일로 인증번호가 발송되었습니다.</Description>
        <TextField label="인증번호" variant="standard" onChange={form.onChange} value={form.values.code} />
      </Inner>
    </Root>
  );
};

const Root = styled.div({
  display: 'flex',
  width: '450px',
  flexDirection: 'column',
  borderRadius: '1rem',
  background: dsPalette.themeWhite.toString(),
  boxShadow: 'rgb(0 0 0 / 4%) 0px 4px 16px 0px',
});

const Inner = styled.div({
  padding: '3rem',
});

const Title = styled.h1({
  marginBottom: '1rem',
  textAlign: 'center',
});

const Description = styled.div({
  fontSize: '.875rem',
});

export default EmailVerify;
