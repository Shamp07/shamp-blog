import React from 'react';
import styled from '@emotion/styled';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const PostEditor = () => (
  <Root>
    <Editor
      initialValue="hello react editor world!"
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut
    />
  </Root>
);

const Root = styled.div({

  '&&& *': {
    fontFamily: 'inherit',
  },

  '.toastui-editor-contents': {
    fontSize: '1.125rem',
    lineHeight: '1.7',
  },

  '.toastui-editor-contents h1': {
    lineHeight: '1.5',
    fontSize: '2.5rem',
    border: 0,
  },

  '.toastui-editor-contents h2': {
    lineHeight: '1.5',
    fontSize: '2rem',
    border: 0,
  },
});

export default PostEditor;
