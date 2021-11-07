import { CategoryType, CategoryPath } from '@types';

export const categoryPath: Record<CategoryType, CategoryPath> = {
  [CategoryType.HOME]: CategoryPath.HOME,
  [CategoryType.PROFILE]: CategoryPath.PROFILE,
  [CategoryType.LIFE]: CategoryPath.LIFE,
  [CategoryType.NOTICE]: CategoryPath.NOTICE,
  [CategoryType.ALL]: CategoryPath.ALL,
  [CategoryType.BEST]: CategoryPath.BEST,
  [CategoryType.JAVASCRIPT]: CategoryPath.JAVASCRIPT,
  [CategoryType.TYPESCRIPT]: CategoryPath.TYPESCRIPT,
  [CategoryType.REACT]: CategoryPath.REACT,
  [CategoryType.REACT_NATIVE]: CategoryPath.REACT_NATIVE,
  [CategoryType.NODEJS]: CategoryPath.NODEJS,
  [CategoryType.ETC]: CategoryPath.ETC,
};

export const categoryName: Record<CategoryPath, string> = {
  [CategoryPath.HOME]: '홈',
  [CategoryPath.PROFILE]: '프로필',
  [CategoryPath.LIFE]: '일상',
  [CategoryPath.NOTICE]: '공지사항',
  [CategoryPath.ALL]: '전체 글',
  [CategoryPath.BEST]: '인기 글',
  [CategoryPath.JAVASCRIPT]: 'JavaScript',
  [CategoryPath.TYPESCRIPT]: 'TypeScript',
  [CategoryPath.REACT]: 'React',
  [CategoryPath.REACT_NATIVE]: 'React Native',
  [CategoryPath.NODEJS]: 'NodeJS',
  [CategoryPath.ETC]: 'etc',
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

const ROOT_PATH_PREFIX = '/';

export const getCategoryPath = (category: CategoryType) => `${ROOT_PATH_PREFIX}${categoryPath[category]}`;
