import React from 'react';
import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';
import useStores from '../../stores/useStores';

const QuillNoSSRWRapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <span>loading...</span>,
});

const Editor = () => {
  const { PostStore } = useStores();
  const { post, postHandleChange } = PostStore;
  const { content } = post;

  return (
    <QuillNoSSRWRapper
      onChange={postHandleChange}
      value={content}
      modules={Editor.modules}
    />
  );
};

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
];

Editor.modules = {
  toolbar: toolbarOptions,
};

export default observer(Editor);
