import React from 'react';
import { useRouter } from 'next/router';

import Button from '@atoms/Button';
import * as T from '@types';
import styled from '@emotion/styled';

interface Props {
  submitText: string;
  onSubmit(): void;
}

const Footer = ({
  submitText, onSubmit,
}: Props) => {
  const router = useRouter();

  return (
    <Root>
      <Button
        size={T.ButtonSize.SMALL}
        variant="outlined"
        color="primary"
        onClick={router.back}
      >
        취소
      </Button>
      <Button
        size={T.ButtonSize.SMALL}
        variant="contained"
        color="primary"
        onClick={onSubmit}
      >
        {submitText}
      </Button>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  padding-top: 18px !important;

  & > button:last-child {
    margin-left: auto;
  }
`;

export default Footer;
