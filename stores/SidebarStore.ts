import { action, makeObservable, observable } from 'mobx';

class SidebarStore {
  root: any;

  topCategoryList: Array<object> = [{
    name: 'Home',
    path: '',
  }, {
    name: '프로필',
    path: 'profile',
  }, {
    name: '일상',
    path: 'life',
  }];

  boardCategoryList: Array<object> = [{
    name: '공지사항',
    path: 'notice',
  },{
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
    notice: '공지사항',
    all: '전체 글',
    best: '인기 글',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    react: 'React',
    rn: 'React Native',
    nodejs: 'NodeJS',
  };

  @observable isOpenSidebar: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action toggleSidebar = () => {
    this.isOpenSidebar = !this.isOpenSidebar;
  };
}

export default SidebarStore;
