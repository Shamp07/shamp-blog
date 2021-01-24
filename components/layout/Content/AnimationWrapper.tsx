import React, { ReactNode } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { useRouter } from 'next/router';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }: Props) => {
  const router = useRouter();
  return (
    <CustomTransitionGroup>
      <Transition
        key={router.asPath}
        timeout={{
          enter: 200,
          exit: 200,
        }}
      >
        {(status) => (
          <AnimationInner
            status={status}
          >
            {children}
          </AnimationInner>
        )}
      </Transition>
    </CustomTransitionGroup>
  );
};

const CustomTransitionGroup = styled(TransitionGroup)`
  position: relative;
`;

interface AnimationStatus {
  status: string;
}

const AnimationInner = styled.div<AnimationStatus>`
  position: ${(props) => (props.status === 'entering' ? 'absolute' : null)};
  opacity: ${(props) => (props.status === 'entered' ? '1' : '0')};
  transition: ${(props) => (props.status !== 'entering' ? 'opacity 200ms ease-in-out, transform 200ms ease-in-out' : null)};
`;

export default AppLayout;
