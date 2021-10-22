import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import * as T from '@types';
import { MediaQuery } from '@constants/styles';

interface Props {
  children: ReactNode;
}

const Content = ({ children }: Props) => {
  const { signStore } = stores();
  const { cookieChecked } = signStore;

  if (!cookieChecked) return null;

  return (
    <Section>
      {children}
    </Section>
  );
};

const Section = styled.section({
  marginLeft: 'auto',
  boxSizing: 'border-box',
  width: '744px',
  marginBottom: '20px',

  [MediaQuery[T.Device.LARGE]]: {
    width: '100%',
  },
});

export default observer(Content);
