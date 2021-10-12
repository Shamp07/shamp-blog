import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import * as T from '@types';
import { categoryPath, categoryName } from '@constants/category';

interface Props {
  category: T.CategoryType;
  isBoard: boolean;
}

const Category = ({ category, isBoard }: Props) => {
  const router = useRouter();

  const baseUrl = isBoard ? '/category' : '';
  const currentPath = (isBoard && router.query.category)
    ? router.query.category[0]
    : router.asPath.replace('/', '');

  return (
    <CategoryList isActive={currentPath === categoryPath[category]}>
      <Link href={`${baseUrl}/${categoryPath[category]}`}>d</Link>
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
