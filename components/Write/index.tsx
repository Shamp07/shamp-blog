import React, {MouseEvent, ChangeEvent, KeyboardEvent, CSSProperties} from 'react';
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
      const { tags, inputs: { tag } } = this;
      if (event.key === 'Enter' && tag) {
        if (!tags.includes(this.inputs.tag)) tags.push(tag);
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
        name="title"
        placeholder="제목을 입력하세요"
        value={form.inputs.title}
        onChange={form.onChange}
        customStyles={titleInputStyles}
        borderless
      />
      <TagForm>
        <TagWrapper>
          {form.tags.map((tag) => <Tag onClick={form.onDelete}>{tag}</Tag>)}
        </TagWrapper>
        <TextField
          variant="outlined"
          name="tag"
          placeholder="태그를 입력하세요"
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
  position: 'absolute',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  padding: '3rem',
  top: 0,
  background: dsPalette.themeWhite.toString(),
});

const TagForm = styled.div({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
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

const titleInputStyles: CSSProperties = {
  padding: 0,
  fontSize: '2.75rem',
  fontWeight: 'bold',
};

export default observer(Write);
