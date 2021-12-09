import React from 'react';
import { Editor, EditorProps } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from '@emotion/styled';

export interface Props extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

const WrappedEditor = (props: Props) => {
  const { forwardedRef } = props;
  return (
    <Root>
      <Editor {...props} ref={forwardedRef} />
    </Root>
  );
};

const Root = styled.div({
  '&&& *': {
    fontFamily: 'inherit',
  },

  '.ProseMirror': {
    fontSize: '1.125rem',
  },

  '.toastui-editor-contents': {
    fontSize: '1.125rem',
    lineHeight: '1.7 !important',
  },

  '.toastui-editor-contents p + h1, .toastui-editor-contents p + h2, .toastui-editor-contents p + h3, .toastui-editor-contents p + h4': {
    marginTop: '2.5rem',
  },

  '.toastui-editor-contents h1': {
    lineHeight: '1.5',
    fontSize: '2.5rem',
    borderBottom: 0,
    marginBottom: '1rem',
  },

  '.toastui-editor-md-heading1': {
    fontSize: '2.5rem',
  },

  '.toastui-editor-contents h2': {
    lineHeight: '1.5',
    fontSize: '2rem',
    borderBottom: 0,
    marginBottom: '1rem',
  },

  '.toastui-editor-md-heading2': {
    fontSize: '2rem',
  },

  '.toastui-editor-contents h3': {
    lineHeight: '1.5',
    fontSize: '1.5rem',
    borderBottom: 0,
    marginBottom: '1rem',
  },

  '.toastui-editor-md-heading3': {
    fontSize: '1.5rem',
  },

  '.toastui-editor-contents h4': {
    lineHeight: '1.5',
    fontSize: '1.125rem',
    marginBottom: '1rem',
  },

  '.toastui-editor-md-heading4': {
    fontSize: '1.125rem;',
  },
});

export default WrappedEditor;
