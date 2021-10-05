import React, { useMemo } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import stores from '@stores';

interface Props {
  category: string;
  tag: string;
}

const Tag = ({ category, tag }: Props) => {
  const { categoryStore } = stores();
  const { tags } = categoryStore;

  const isBestOrAll = ['best', 'all'].includes(tag);

  const bestTag = useMemo(() => (
    isBestOrAll ? null : (
      <Row isActive={tag === 'best'} isBest>
        <Link href={`/category/${category}/best`}>
          인기글
        </Link>
      </Row>
    )
  ), [isBestOrAll, tag]);

  const tagList = tags.map((value) => (
    <Row isActive={tag === value}>
      <Link href={`/category/${category}/${tag}`}>
        {tag}
      </Link>
    </Row>
  ));

  return (
    <Root>
      {bestTag}
      <Row isActive={tag === undefined}>
        <Link href={`/category/${category}`}>
          전체
        </Link>
      </Row>
      {tagList}
    </Root>
  );
};

const Root = styled.ul`
  list-style: none;
  overflow-x: visible;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar {
    width: 10px;
    height: 6px;
    background: transparent;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2d79c7;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #ebeef1;;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

interface RowProps {
  isActive: boolean;
  isBest?: boolean;
}

const Row = styled.li<RowProps>(({ isActive, isBest }) => ({
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

    ...(isBest ? ({
      border: '#eeee00 1.5px solid',
      backgroundColor: '#fff',
      color: '#eeee00',
      padding: '4.5px 13.5px',
    }) : null),

    ...(isActive ? ({
      ...(isBest ? ({
        color: '#fff !important',
        backgroundColor: '#eeee00 !important',
      }) : ({
        color: '#fff',
        backgroundColor: '#2d79c7',
      })),
    }) : null),
  },
}));
export default Tag;
