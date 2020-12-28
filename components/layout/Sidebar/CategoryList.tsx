import React from 'react';
import Category from './Category';

interface CategoryProps {
  path: string,
  name: string,
}

interface CategoryArrayProps {
  array: Array<CategoryProps>;
}

const CategoryList: React.FC<CategoryArrayProps> = ({ array }) => {
  return array.map((data: CategoryProps) => (
    <Category path={data.path} name={data.name} key={data.path} />));
};
export default CategoryList;
