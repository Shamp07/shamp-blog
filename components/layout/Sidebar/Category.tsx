import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/Link';

interface CategoryProps {
  path: string,
  name: string,
}

const Category: React.FC<CategoryProps> = ({ path, name }: CategoryProps) => {
  const router = useRouter();
  return (
    <li className={router.asPath === path ? 'active' : ''}>
      <Link href={path}>{name}</Link>
    </li>
  );
};

export default Category;
