import React, { MouseEvent, ChangeEvent, KeyboardEvent } from 'react';
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
  inputs: {
    title: string;
    tag: string;
  };
  tags: string[];
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  onKeyPress(event: KeyboardEvent<HTMLInputElement>): void;
  onDelete(event: MouseEvent<HTMLElement>): void;
}

const Write = () => {
  const form = useLocalObservable<Form>(() => ({
    inputs: {
      title: '',
      tag: '',
    },
    tags: [],
    onChange(event) {
      this.inputs = {
        ...this.inputs,
        [event.target.name]: event.target.value,
      };
    },
    onKeyPress(event) {
      if (event.key === 'Enter' && this.inputs.tag) {
        if (!this.tags.includes(this.inputs.tag)) this.tags.push(this.inputs.tag);
        this.inputs.tag = '';
      }
    },
    onDelete(event) {
      const idx = this.tags.indexOf(event.currentTarget.innerText);
      if (idx > -1) {
        this.tags.splice(idx, 1);
      }
    },
  }));

  return (
    <Root>
      <TextField
        variant="outlined"
        label="제목"
        name="title"
        value={form.inputs.title}
        onChange={form.onChange}
      />
      <TagForm>
        <TagWrapper>
          {form.tags.map((tag) => <Tag onClick={form.onDelete}>{tag}</Tag>)}
        </TagWrapper>
        <TextField
          variant="outlined"
          name="tag"
          value={form.inputs.tag}
          onKeyPress={form.onKeyPress}
          onChange={form.onChange}
          borderless
        />
      </TagForm>
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

const TagForm = styled.div({
  display: 'flex',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  alignItems: 'center',
});

const TagWrapper = styled.div({
  display: 'flex',
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
  marginLeft: '0.5rem',
});

export default observer(Write);
