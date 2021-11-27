import React from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { observer, useLocalObservable } from 'mobx-react-lite';

import dsPalette from '@constants/ds-palette';
import TextField from '@atoms/TextField';

const Editor = dynamic(
  () => import('./PostEditor'),
  { ssr: false },
);

const Write = () => {
  const form = useLocalObservable(() => ({
    values: {
      title: '',
      tags: '',
    },
    onChange() {

    },
  }));

  return (
    <Root>
      <TextField
        variant="standard"
        label="제목"
        name="title"
        onChange={form.onChange}
      />
      <Editor />
    </Root>
  );
};

const Root = styled.div({
  background: dsPalette.themeWhite.toString(),
  width: '90%',
  borderRadius: '1rem',
  padding: '3rem',
});

export default observer(Write);
