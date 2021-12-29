import React, {
  forwardRef, useRef, useEffect, MutableRefObject,
  useState,
} from 'react';
import dynamic from 'next/dynamic';
import { Viewer as ViewerType, ViewerProps } from '@toast-ui/react-editor';
import { Props as WrappedViewerProps } from './WrappedViewer';

const Viewer = dynamic<WrappedViewerProps>(() => import('./WrappedViewer'), { ssr: false });
const ViewerWithForwardedRef = forwardRef<ViewerType | undefined, ViewerProps>(
  (props, ref) => (
    <Viewer {...props} forwardedRef={ref as MutableRefObject<ViewerType>} />
  ),
);

interface Props extends ViewerProps {
  content: string;
}

const MarkdownViewer = ({ content }: Props) => {
  const viewerRef = useRef<ViewerType>();
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!viewerRef.current) {
      setLoading(true);
      return;
    }

    const instance = viewerRef.current.getInstance();

    instance.setMarkdown(content);
  }, [content, ready]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setReady(true);
      }, 1000);
    }
  }, [loading]);

  return (
    <ViewerWithForwardedRef ref={viewerRef} />
  );
};

export default MarkdownViewer;
