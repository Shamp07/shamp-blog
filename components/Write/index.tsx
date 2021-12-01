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
  tag: string;
  tags: string[];
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  onAddTag(event: KeyboardEvent): void;
}

const Write = () => {
  const form = useLocalObservable<Form>(() => ({
    title: '',
    tag: '',
    tags: [],
    onChange(event) {
      this.title = event.target.value;
    },
    onAddTag(event) {
      if (event.key === 'Enter' && event.target) {
        form.tags.push(event.target.value);
        form.tag = '';
      }
    },
  }));

  return (
    <Root>
      <TextField
        variant="outlined"
        label="제목"
        name="title"
        value={form.title}
        onChange={form.onChange}
      />
      <Tags>
        <div>
          {form.tags.map((tag) => <Tag>{tag}</Tag>)}
        </div>
        <TextField
          variant="outlined"
          onKeyPress={form.onAddTag}
          name="tag"
          value={form.tag}
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
  alignItems: 'center',
  paddingLeft: '1rem',
  paddingRight: '1rem',
});

const Tag = styled.div({
  display: 'flex',
  background: dsPalette.themePrimary.toString(),
  color: dsPalette.themeWhite.toString(),
  borderRadius: '1rem',
  fontSize: '1rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  height: '2rem',
  alignItems: 'center',
  cursor: 'pointer',
});

export default observer(Write);
