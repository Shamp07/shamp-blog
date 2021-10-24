import React from 'react';
import styled from '@emotion/styled';

import dsPalette from '@constants/ds-palette';

const SignInForm = () => (
  <Root>
    안녕하세요
  </Root>
);

const Root = styled.div({
  background: dsPalette.themeWhite.toString(),
  boxShadow: 'rgb(0 0 0 / 4%) 0px 4px 16px 0px',
  display: 'flex',
  alignItems: 'center',
});

const Wrapper = styled.div({

})

export default SignInForm;
