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

  bottomCategoryList: Array<object> = [{
    name: '전체 글',
    path: '/category/all',
  }, {
    name: '인기 글',
    path: '/category/best',
  }, {
    name: 'JavaScript',
    path: '/category/javascript',
  }, {
    name: 'TypeScript',
    path: '/category/typescript',
  }, {
    name: 'React',
    path: '/category/react',
  }, {
    name: 'React Native',
    path: '/category/rn',
  }, {
    name: 'NodeJS',
    path: '/category/nodejs',
  }];

  bottomCategoryName: object = {
    all: '전체 글',
    best: '인기 글',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    react: 'React',
    rn: 'React Native',
    nodejs: 'NodeJS',
  };

  @observable isOpenSidebar = false;

  constructor(root: any) {
    this.root = root;
  }

  @action toggleSidebar = () => {
    this.isOpenSidebar = !this.isOpenSidebar;
  };
}

export default SidebarStore;
