import React, {ChangeEvent} from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { observer, useLocalObservable } from 'mobx-react-lite';

import dsPalette from '@constants/ds-palette';
import TextField from '@atoms/TextField';

const Editor = dynamic(
  () => import('./PostEditor'),
  { ssr: false },
);

interface Form {
  title: string;
  tags: string[];
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

const Write = () => {
  const form = useLocalObservable<Form>(() => ({
    title: '',
    tags: [],
    onChange(event) {
      this.title = event.target.value;
    },
  }));

  return (
    <Root>
      <TextField
        variant="outlined"
        label="제목"
        name="title"
        onChange={form.onChange}
      />
      <Tags>
        <div></div>
        <TextField
          variant="outlined"
          borderless
        />
      </Tags>
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

const Tags = styled.div({
  display: 'flex',
  border: '1px solid rgba(0, 0, 0, 0.23)',
});

export default observer(Write);
