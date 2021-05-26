import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import useStores from '@stores/useStores';

interface Props {
  path: string;
  name: string;
  isBoard: boolean;
}

const Category = ({ path, name, isBoard }: Props) => {
  const router = useRouter();
  if (!router.query.board) return null;

  const { SidebarStore } = useStores();
  const { toggleSidebar } = SidebarStore;

  const baseUrl = isBoard ? '/category' : '';
  const currentPath = isBoard ? router.query.board[0] : router.asPath.replace('/', '');

  return (
    <CategoryList active={currentPath === path} onClick={toggleSidebar}>
      <Link href={`${baseUrl}/${path}`}>{name}</Link>
    </CategoryList>
  );
};

interface CategoryListProps {
  active: boolean;
}

const CategoryList = styled.li<CategoryListProps>`
  ${(props) => (props.active ? 'background-color: #2d79c7 !important;' : null)};
  & > a {
    ${(props) => (props.active ? 'transition: all 0.3s;' : null)};
    ${(props) => (props.active ? 'color: #ffffff !important;' : null)};
  }
`;

export default Category;
