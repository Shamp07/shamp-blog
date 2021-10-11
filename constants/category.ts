import { CategoryType } from '@types';

export const categoryPath: Record<CategoryType, string> = {
  [CategoryType.HOME]: '',
  [CategoryType.PROFILE]: 'profile',
  [CategoryType.LIFE]: 'life',
  [CategoryType.NOTICE]: 'notice',
  [CategoryType.ALL]: 'all',
  [CategoryType.BEST]: 'best',
  [CategoryType.JAVASCRIPT]: 'javascript',
  [CategoryType.TYPESCRIPT]: 'typescript',
  [CategoryType.REACT]: 'react',
  [CategoryType.REACT_NATIVE]: 'rn',
  [CategoryType.NODEJS]: 'nodejs',
  [CategoryType.ETC]: 'etc',
};

export const categoryName: Record<CategoryType, string> = {
  [CategoryType.HOME]: '홈',
  [CategoryType.PROFILE]: '프로필',
  [CategoryType.LIFE]: '일상',
  [CategoryType.NOTICE]: '공지사항',
  [CategoryType.ALL]: '전체 글',
  [CategoryType.BEST]: '인기 글',
  [CategoryType.JAVASCRIPT]: 'JavaScript',
  [CategoryType.TYPESCRIPT]: 'TypeScript',
  [CategoryType.REACT]: 'React',
  [CategoryType.REACT_NATIVE]: 'React Native',
  [CategoryType.NODEJS]: 'NodeJS',
  [CategoryType.ETC]: 'etc',
};

export const topCategories = [CategoryType.HOME, CategoryType.PROFILE, CategoryType.LIFE];
export const categories = [
  CategoryType.NOTICE,
  CategoryType.ALL,
  CategoryType.BEST,
  CategoryType.JAVASCRIPT,
  CategoryType.TYPESCRIPT,
  CategoryType.REACT,
  CategoryType.REACT_NATIVE,
  CategoryType.NODEJS,
  CategoryType.ETC,
];
