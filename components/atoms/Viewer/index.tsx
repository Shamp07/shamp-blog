import React, {
  forwardRef, useRef, useEffect, MutableRefObject,
} from 'react';
import { observer } from 'mobx-react-lite';
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
  useEffect(() => {
    if (!viewerRef.current) {
      return;
    }

    const instance = viewerRef.current.getInstance();

    instance.setMarkdown(content);
  }, [content]);

  return (
    <ViewerWithForwardedRef ref={viewerRef} />
  );
};

export default observer(MarkdownViewer);
