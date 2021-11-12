import React, { ChangeEvent, useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { useMutation } from 'react-query';
import axios from 'axios';

import dsPalette from '@constants/ds-palette';
import TextField from '@atoms/TextField';
import { SubmitButton } from '@atoms/Button';
import { emailValidator, passwordValidator } from '@utilities/validators';

enum UI {
  EMAIL = 'EMAIL',
  USERNAME = 'USERNAME',
  PASSWORD = 'PASSWORD',
  PASSWORD_CHECK = 'PASSWORD_CHECK',
}

interface UIError {
  isError: boolean;
  message?: string;
}

const INITIAL_ERRORS: Record<UI, UIError> = {
  [UI.EMAIL]: { isError: false },
  [UI.USERNAME]: { isError: false },
  [UI.PASSWORD]: { isError: false },
  [UI.PASSWORD_CHECK]: { isError: false },
};

interface Props {
  setEmail(email: string): void;
  next(): void;
}

const Form = ({ setEmail, next }: Props) => {
  const form = useLocalObservable(() => ({
    values: {
      email: '',
      name: '',
      password: '',
      passwordCheck: '',
    },
    errors: INITIAL_ERRORS,
    onChange(event: ChangeEvent<HTMLInputElement>) {
      this.values = {
        ...this.values,
        [event.target.name]: event.target.value,
      };
    },
    onValidation() {
      const { email, password, passwordCheck } = this.values;

      if (!emailValidator(email)) {
        this.errors[UI.EMAIL] = {
          isError: true,
          message: '이메일 형식이 올바르지 않습니다. 다시 입력해주세요.',
        };
        return false;
      }

      const message = passwordValidator(password, passwordCheck);
      if (message) {
        this.errors[UI.PASSWORD] = {
          isError: true,
          message,
        };
        return false;
      }

      return true;
    },
  }));

  const mutation = useMutation(() => axios.post('/api/user', form.values));

  const onSignUp = () => {
    if (!form.onValidation()) return;

    mutation.mutate();
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      setEmail(form.values.email);
      next();
    }
  }, [mutation.isSuccess]);

  const isAvailable = Object.values(form.values).every((str) => str.trim());

  return (
    <Root>
      <Inner>
        <Title>회원가입</Title>
        <TextField
          label="이메일 주소"
          variant="standard"
          name="email"
          onChange={form.onChange}
          value={form.values.email}
          helperText={form.errors[UI.EMAIL].message}
          description="회원가입을 위해서 해당 이메일을 통해 인증이 필요합니다."
        />
        <TextField
          label="이름"
          variant="standard"
          name="name"
          onChange={form.onChange}
          value={form.values.name}
        />
        <TextField
          type="password"
          label="비밀번호"
          variant="standard"
          name="password"
          onChange={form.onChange}
          value={form.values.password}
          error={form.errors[UI.PASSWORD].isError}
        />
        <TextField
          type="password"
          label="비밀번호 확인"
          variant="standard"
          name="passwordCheck"
          onChange={form.onChange}
          value={form.values.passwordCheck}
          helperText={form.errors[UI.PASSWORD].message}
          error={form.errors[UI.PASSWORD].isError}
          description="8~16자 영문 대 소문자, 숫자, 특수문자를 사용해주세요."
        />
        <Notice>
          <ul>
            <li>비밀번호는 단방향 암호화가 진행되어 블로그 주인조차 알 방법이 없습니다.</li>
            <li>블로그는 오픈 소스로 공개되어있습니다.</li>
          </ul>
        </Notice>
        <SignUpButton variant="contained" disabled={!isAvailable} onClick={onSignUp}>
          회원가입
        </SignUpButton>
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

const SignUpButton = styled(SubmitButton)({
  width: '100%',
  fontSize: '1rem',
  '&&&': {
    padding: '1rem',
  },
});

const Notice = styled.div({
  color: dsPalette.typeSecond.toString(),
  backgroundColor: dsPalette.themeBackground.toString(),
  lineHeight: 1.5,
  fontSize: '.75rem',
  padding: '1rem 1rem 1rem 2rem',
  marginBottom: '1rem',
  borderRadius: '.25rem',
});

export default observer(Form);
