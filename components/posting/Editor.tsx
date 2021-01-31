import React from 'react';
import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';
import hljs from 'highlight.js';
import styled from 'styled-components';
import useStores from '../../stores/useStores';

hljs.configure({
  languages: ['javascript'],
});

const QuillNoSSRWRapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <span>loading...</span>,
});

const Editor = () => {
  const { PostStore } = useStores();
  const { post, postHandleChange } = PostStore;
  const { content } = post;
  console.log()
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

const CustomQuill = styled(QuillNoSSRWRapper)`
  & .ql-editor {
    font-size: 16px;  
  }
  
  & pre.ql-syntax, & pre.ql-syntax * {
    font-family: 'JetBrains Mono', 'Noto Sans KR', serif;
    font-size: 14px;
    line-height: 1.5;
  }
`;

export default observer(Editor);
