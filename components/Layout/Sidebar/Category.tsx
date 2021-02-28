import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import useStores from '../../../stores/useStores';

const Category: FC<CategoryProps> = ({ path, name, isBoard }: CategoryProps) => {
  const { SidebarStore } = useStores();
  const { toggleSidebar } = SidebarStore;
  const router = useRouter();
  let baseUrl: string = '';
  let currentPath: string;

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

export interface CategoryProps {
  path: string;
  name: string;
  isBoard: boolean;
}

interface CategoryInterface {
  active: boolean;
}

const CategoryList = styled.li<CategoryInterface>`
  ${(props) => (props.active ? 'background-color: #2d79c7 !important;' : null)};
  & > a {
    ${(props) => (props.active ? 'transition: all 0.3s;' : null)};
    ${(props) => (props.active ? 'color: #ffffff !important;' : null)};
  }
`;

export default Category;
