import React, {
  MouseEvent, ChangeEvent, KeyboardEvent, CSSProperties,
} from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { observer, useLocalObservable } from 'mobx-react-lite';

import dsPalette from '@constants/ds-palette';
import TextField from '@atoms/TextField';
import Button from '@atoms/Button';

const Editor = dynamic(
  () => import('./PostEditor'),
  { ssr: false },
);

const Viewer = dynamic(
  () => import('./PostViewer'),
  { ssr: false },
);

interface Form {
  inputs: {
    title: string;
    tag: string;
    content: string;
  };
  tags: string[];
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  onChangeContent(value: string): void;
  onKeyPress(event: KeyboardEvent<HTMLInputElement>): void;
  onDelete(event: MouseEvent<HTMLElement>): void;
}

const Write = () => {
  const form = useLocalObservable<Form>(() => ({
    inputs: {
      title: '',
      tag: '',
      content: '',
    },
    tags: [],
    onChange(event) {
      this.inputs = {
        ...this.inputs,
        [event.target.name]: event.target.value,
      };
    },
    onChangeContent() {
      console.log('shit');
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
      <PostForm>
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
            customStyles={inputStyles}
            borderless
          />
        </TagForm>
        <Editor content={form.inputs.content} onChange={form.onChangeContent} />
        <Footer>
          <Button>
            작성하기
          </Button>
        </Footer>
      </PostForm>
      <PostViewer>
        <h1>{form.inputs.title}</h1>
        <Viewer content={form.inputs.content} />
      </PostViewer>
    </Root>
  );
};

const Root = styled.div({
  display: 'flex',
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  background: dsPalette.themeWhite.toString(),
});

const PostForm = styled.form({
  flex: '1 1 0%',
  padding: '3rem',
  boxSizing: 'border-box',
  boxShadow: 'rgb(0 0 0 / 2%) 0px 0px 8px',
});

const PostViewer = styled.div({
  flex: '1 1 0%',
  background: dsPalette.write.viewerBackground.toString(),
});

const TagForm = styled.div({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
  marginBottom: '.75rem',
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
  marginRight: '.75rem',
  transition: 'all 0.125s ease-in 0s',
  animation: '0.125s ease-in-out 0s 1 normal forwards running iMKika',
});

const Footer = styled.div({
  position: 'absolute',
  borderTop: '1px solid #e6e6e6',
  boxSizing: 'border-box',
  width: '100%',
  left: 0,
  bottom: 0,
});

const inputStyles: CSSProperties = {
  paddingLeft: 0,
  paddingRight: 0,
  fontSize: '1.125rem',
};

const titleInputStyles: CSSProperties = {
  ...inputStyles,
  paddingTop: 0,
  fontSize: '2.75rem',
  fontWeight: 'bold',
};

export default observer(Write);
