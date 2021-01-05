import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/Link';

interface CategoryProps {
  path: string,
  name: string,
}

const Category: React.FC<CategoryProps> = ({ path, name }: CategoryProps) => {
  const router = useRouter();
  const boardParams = router.query.board as Array<string>;
  const boardPath = boardParams ? boardParams[0] : '';

  return (
    <li className={boardPath === path ? 'active' : ''}>
      <Link href={`/category/${path}`}>{name}</Link>
    </li>
  );
};

export default Category;
