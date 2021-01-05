import { action, observable } from 'mobx';

class SidebarStore {
  root: any;

  topCategoryList: Array<object> = [{
    name: 'Home',
    path: '/',
  }, {
    name: '프로필',
    path: '/profile',
  }, {
    name: '일상',
    path: '/life',
  }];

  boardCategoryList: Array<object> = [{
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
  }];

  boardCategoryName: object = {
    all: '전체 글',
    best: '인기 글',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    react: 'React',
    rn: 'React Native',
    nodejs: 'NodeJS',
  };

  @observable isOpenSidebar: boolean = false;

  constructor(root: any) {
    this.root = root;
  }

  @action toggleSidebar = () => {
    this.isOpenSidebar = !this.isOpenSidebar;
  };
}

export default SidebarStore;
