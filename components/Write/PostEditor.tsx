import React, { useRef, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

interface Props {
  content: string;
  onChange(): void;
}

const PostEditor = ({ content, onChange }: Props) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

  }, [editorRef]);

  const EditorWithForwardedRef = React.forwardRef((props, ref) => (
    <Editor {...props} forwardedRef={ref} />
  ));

  const onChange = useCallback(() => {
    if (!editorRef.current) return;
    const instance = editorRef.current?.getInstance();
    onChange(instance.getMarkdown());
  }, [editorRef]);

  return (
    <Root>
      <EditorWithForwardedRef
        placeholder="내용을 입력해주세요..."
        previewStyle="vertical"
        initialEditType="wysiwyg"
        useCommandShortcut
        hideModeSwitch
        initialValue={content}
        onChange={(event) => console.log(event)}
        ref={editorRef}
      />
    </Root>
  );
}

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

export default PostEditor;
