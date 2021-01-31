import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import useStores from '../../stores/useStores';

const PasswordInput: React.FC = () => {
  const { SignStore } = useStores();
  const { loginInfo, isShowPassword, loginHandleChange } = SignStore;
  const { password } = loginInfo;

  return (
    <CustomFormControl>
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
      <Input
        id="standard-adornment-password"
        type={isShowPassword ? 'text' : 'password'}
        value={password}
        name="password"
        onChange={loginHandleChange}
      />
    </CustomFormControl>
  );
};

const CustomFormControl = styled(FormControl)`
  width: 100%;
`;

export default observer(PasswordInput);
