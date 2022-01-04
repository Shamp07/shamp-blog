import React, {ChangeEvent, CSSProperties, useEffect} from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useMutation } from 'react-query';
import axios from 'axios';

import TextField from '@atoms/TextField';
import styled from '@emotion/styled';
import dsPalette from '@constants/ds-palette';
import Button from '@atoms/Button';

interface Props {
  email: string;
  next(): void;
}

const EmailVerify = ({ email, next }: Props) => {
  const form = useLocalObservable(() => ({
    values: {
      code: '',
    },
    onChange(event: ChangeEvent<HTMLInputElement>) {
      this.values.code = event.target.value;
    },
  }));

  const sendMutation = useMutation(() => axios.post('/api/user/email/send', { email }));
  const verifyMutation = useMutation(() => axios.post('/api/user/email/verify', { email, code: form.values.code }));

  useEffect(() => {
    sendMutation.mutate();
  }, []);

  useEffect(() => {
    if (verifyMutation.isSuccess) {
      next();
    }
  }, [verifyMutation.isSuccess]);

  const onVerify = () => {
    verifyMutation.mutate();
  };

  const isAvailable = form.values.code.length === 6;

  return (
    <Root>
      <Inner>
        <Title>이메일 인증</Title>
        <Description>입력하신 이메일로 인증번호가 발송되었습니다.</Description>
        <TextField label="인증번호" variant="standard" onChange={form.onChange} value={form.values.code} />
        <Button
          customStyles={signUpButtonStyles}
          variant="contained"
          disabled={!isAvailable}
          onClick={onVerify}
        >
          인증하기
        </Button>
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

const signUpButtonStyles: CSSProperties = {
  width: '100%',
  fontSize: '.9rem',
  padding: '.9rem',
};

export default observer(EmailVerify);
