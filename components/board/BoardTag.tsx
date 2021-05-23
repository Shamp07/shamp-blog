import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

interface Props {
  tag: string;
}

const BoardTag = ({ tag }: Props) => {
  const router = useRouter();
  if (!router.query.board) return null;

  const boardPath = router.query.board[0];
  const boardTag = router.query.board[1];

  return (
    <CategoryTag active={boardTag === tag}>
      <Link href={`/category/${boardPath}/${tag}`}>
        {tag}
      </Link>
    </CategoryTag>
  );
};

interface CategoryTagProps {
  active: boolean;
}

const CategoryTag = styled.li<CategoryTagProps>`
  & > a {
    ${(props) => (props.active ? 'color: #fff !important' : null)};
    ${(props) => (props.active ? 'background-color: #2d79c7 !important' : null)};
  }
`;

export default BoardTag;
