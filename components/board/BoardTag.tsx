import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

interface BoardTagProps {
  tags: string;
}

const BoardTag = ({ tags }: BoardTagProps) => {
  const router = useRouter();
  const boardParams = router.query.board as Array<string>;
  const boardPath = boardParams[0];
  const boardTag = boardParams[1];

  return (
    <CategoryTag active={boardTag === tags}>
      <Link href={`/category/${boardPath}/${tags}`}>
        {tags}
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
