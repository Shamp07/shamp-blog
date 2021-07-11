import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import * as T from '@types';

interface Props {
  tag: T.Tag['tag'];
}

const BoardTag = ({ tag }: Props) => {
  const router = useRouter();
  if (!router.query.board) return null;

  const boardPath = router.query.board[0];
  const boardTag = router.query.board[1];

  return (
    <Tag isActive={boardTag === tag}>
      <Link href={`/category/${boardPath}/${tag}`}>
        {tag}
      </Link>
    </Tag>
  );
};

interface ActiveProp {
  isActive: boolean;
}

export const Tag = styled.li<ActiveProp>(({ isActive }) => ({
  display: 'inline-block',
  margin: '10px 0 10px 10px',

  '&:last-child': {
    marginRight: '10px',
  },

  '& > a': {
    display: 'inline-block',
    padding: '6px 15px',
    lineHeight: 1,
    minWidth: '45px',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 'bold',
    transition: 'all 0.2s',
    color: '#616161',
    backgroundColor: '#e6e6e6',

    ...(isActive ? ({
      color: '#fff',
      backgroundColor: '#2d79c7',
    }) : null),
  },
}));

export default BoardTag;
