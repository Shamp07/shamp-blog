import React, { useEffect } from 'react';
import { Viewer } from '@toast-ui/react-editor';

interface Props {
  content: string;
}

const PostViewer = ({ content }: Props) => {
  useEffect(() => {
  }, [content]);

  return (
    <Viewer />
  );
};

export default PostViewer;
