import React from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import MarkdownViewer from '@uiw/react-markdown-preview';

interface Props {
  content: string;
  onChangeContent(value: string | undefined): void;
}

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false },
);

const Editor = ({ content, onChangeContent }: Props) => (
  <div>
    <MDEditor
      value={content}
      onChange={onChangeContent}
    />
    <MarkdownViewer source={content} />
  </div>
);

export default Editor;
