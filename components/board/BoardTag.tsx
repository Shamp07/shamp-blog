import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';

interface BoardTagInterface {
  category: string;
}

const BoardTag: React.FC<BoardTagInterface> = ({ category }: BoardTagInterface) => {
  const router = useRouter();
  const boardParams = router.query.board as Array<string>;
  const boardPath = boardParams[0];
  const boardTag = boardParams[1];

  return (
    <CategoryTagList active={boardTag === category}>
      <Link href={`/category/${boardPath}/${category}`}>
        {category}
      </Link>
    </CategoryTagList>
  );
};

interface TagInterface {
  active: boolean;
}

const CategoryTagList = styled.li<TagInterface>`
  & > a {
    ${(props) => (props.active ? 'color: #fff !important;' : null)}
    ${(props) => (props.active ? 'background-color: #2d79c7 !important;' : null)}
  }
`;

export default BoardTag;
