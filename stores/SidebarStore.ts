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

  constructor(root: any) {
    this.root = root;
  }
}

export default SidebarStore;
