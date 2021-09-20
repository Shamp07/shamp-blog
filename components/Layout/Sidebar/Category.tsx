import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import stores from '@stores';

interface Props {
  path: string;
  name: string;
  isBoard: boolean;
}

const Category = ({ path, name, isBoard }: Props) => {
  const router = useRouter();

  const { sidebarStore } = stores();

  const baseUrl = isBoard ? '/category' : '';
  const currentPath = (isBoard && router.query.board) ? router.query.board[0] : router.asPath.replace('/', '');

  return (
    <CategoryList isActive={currentPath === path}>
      <Link href={`${baseUrl}/${path}`}>{name}</Link>
    </CategoryList>
  );
};

interface ActiveProp {
  isActive: boolean;
}

const CategoryList = styled.li<ActiveProp>(({ isActive }) => ({
  '&&&': {
    ...(isActive ? ({
      backgroundColor: '#2d79c7',
      '& > a': {
        transition: 'all 0.3s',
        color: '#ffffff',
      },
    }) : null),
  },
}));

export default Category;
