import React, { FC } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

interface BoardTagInterface {
  tags: string;
}

const BoardTag: FC<BoardTagInterface> = ({ tags }: BoardTagInterface) => {
  const router = useRouter();
  const boardParams = router.query.board as Array<string>;
  const boardPath = boardParams[0];
  const boardTag = boardParams[1];

  return (
    <CategoryTagList active={boardTag === tags}>
      <Link href={`/category/${boardPath}/${tags}`}>
        {tags}
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
