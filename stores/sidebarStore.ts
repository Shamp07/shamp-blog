import { observable } from 'mobx';

export interface SidebarStore {
  topCategories: {
    name: string;
    path: string;
  }[];
  categories: {
    name: string;
    path: string;
  }[];
  categoryNames: {
    [name: string]: string;
  };
  isOpenSidebar: boolean;
  toggleSidebar(): void;
  getCategoryName(path: string): string;
}

const sidebarStore: SidebarStore = {
  topCategories: [{
    name: '홈',
    path: '',
  }, {
    name: '프로필',
    path: 'profile',
  }, {
    name: '일상',
    path: 'life',
  }],
  categories: [{
    name: '공지사항',
    path: 'notice',
  }, {
    name: '전체 글',
    path: 'all',
  }, {
    name: '인기 글',
    path: 'best',
  }, {
    name: 'JavaScript',
    path: 'javascript',
  }, {
    name: 'TypeScript',
    path: 'typescript',
  }, {
    name: 'React',
    path: 'react',
  }, {
    name: 'React Native',
    path: 'rn',
  }, {
    name: 'NodeJS',
    path: 'nodejs',
  }, {
    name: 'etc',
    path: 'etc',
  }],
  categoryNames: {
    notice: '공지사항',
    all: '전체 글',
    best: '인기 글',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    react: 'React',
    rn: 'React Native',
    nodejs: 'NodeJS',
    etc: 'etc',
  },
  isOpenSidebar: false,
  toggleSidebar() {
    this.isOpenSidebar = !this.isOpenSidebar;
  },
  getCategoryName(path) {
    return this.categoryNames[path] ?? '';
  },
};

export default observable(sidebarStore);
