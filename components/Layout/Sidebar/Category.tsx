import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import useStores from '../../../stores/useStores';
import { RootStore } from '../../../stores';

interface CategoryProps {
  path: string;
  name: string;
  isBoard: boolean;
}

const Category = ({ path, name, isBoard }: CategoryProps) => {
  const { SidebarStore } = useStores() as RootStore;
  const { toggleSidebar } = SidebarStore;
  const router = useRouter();
  let baseUrl = '';
  let currentPath;

  // 게시판의 경우
  if (isBoard) {
    baseUrl = baseUrl.concat('/category');
    const routerParams = router.query.board as Array<string>;
    currentPath = routerParams ? routerParams[0] : '';
  } else {
    // 상단 카테고리
    currentPath = router.asPath.replace('/', '');
  }

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
