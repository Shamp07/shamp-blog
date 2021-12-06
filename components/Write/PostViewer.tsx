import React from 'react';
import { Viewer } from '@toast-ui/react-editor';

interface Props {
  content: string;
}

const PostViewer = ({ content }: Props) => (
  <Viewer
    initialValue={content}
  />
);

export default PostViewer;
