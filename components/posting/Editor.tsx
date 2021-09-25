import React from 'react';
import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import hljs from 'highlight.js';

import stores from '@stores';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <span>loading...</span>,
});

const Editor = () => {
  const { postStore } = stores();
  const { post, postHandleChange } = postStore;

  if (!post) return null;

  const { content } = post;
  return (
    <CustomQuill
      onChange={postHandleChange}
      value={content}
      modules={Editor.modules}
    />
  );
};

const toolbarOptions = [
  [{ header: 1 }, { header: 2 }],
  ['bold', 'italic', 'underline', 'strike'],
  ['code-block'],

  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ indent: '-1' }, { indent: '+1' }],
  ['image'],
];

Editor.modules = {
  toolbar: toolbarOptions,
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value,
  },
};

hljs.configure({
  languages: ['javascript'],
});

const CustomQuill = styled(QuillNoSSRWrapper)`
  border-radius: 10px;
  border: 1px solid #ccc;
  
  & > div {
    border: 0 !important;
  }

  & > div:first-of-type {
    border-bottom: 1px solid #ccc !important;
  }
  
  & .ql-editor {
    font-size: 16px;  
    line-height: 2;
  }
  
  & pre.ql-syntax, & pre.ql-syntax * {
    font-family: 'JetBrains Mono', 'Noto Sans KR', serif;
    font-size: 14px;
    line-height: 1.5;
    background-color: #2e3440 !important;
  }
`;

export default observer(Editor);
