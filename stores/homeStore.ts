import { observable } from 'mobx';

import Axios from '@utilities/axios';
import * as T from '@types';

export interface HomeStore {
  recentlyPostList: T.RecentPost[];
  noticePostList: T.NoticePost[];
  footprintList: T.FootPrint[];
  footprintSize: number;
  modifierFootprintId: number;
  setModifierFootprintId(id: number): void;
  getRecentlyPostList(): Promise<void>;
  getNoticePostList(): Promise<void>;
  addFootprint(footprint: string): void;
  moreFootprint(): void;
  getFootprint(): Promise<void>;
  modifyFootprint(id: number, content: string): void;
  deleteFootprint(id: number): void;
}

const homeStore: HomeStore = {
  recentlyPostList: [],
  noticePostList: [],
  footprintList: [],
  footprintSize: 20,
  modifierFootprintId: 0,
  setModifierFootprintId(id) {
    this.modifierFootprintId = id;
  },
  async getRecentlyPostList() {
    await Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/post/list/recently`,
      success: (response) => {
        const { result } = response.data;
        this.recentlyPostList = result;
      },
    });
  },
  async getNoticePostList() {
    await Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/post/list/notice`,
      success: (response) => {
        const { result } = response.data;
        this.noticePostList = result;
      },
    });
  },
  addFootprint(footprint: string) {
    Axios({
      method: T.RequestMethod.POST,
      url: '/api/footprint',
      data: {
        content: footprint,
      },
      success: () => {
        this.getFootprint();
      },
    });
  },
  moreFootprint() {
    this.footprintSize += 20;
    this.getFootprint();
  },
  async getFootprint() {
    await Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/footprint`,
      data: {
        size: this.footprintSize,
      },
      success: (response) => {
        const { result } = response.data;
        this.footprintList = result;
      },
    });
  },
  modifyFootprint(id, content) {
    Axios({
      method: T.RequestMethod.PUT,
      url: '/api/footprint',
      data: {
        id,
        content,
      },
      success: () => {
        this.getFootprint();
        this.setModifierFootprintId(0);
      },
    });
  },
  deleteFootprint(id) {
    Axios({
      method: T.RequestMethod.DELETE,
      url: '/api/footprint',
      data: { id },
      success: () => {
        this.getFootprint();
      },
    });
  },
};

export const initialHome: {
  recentlyPostList: T.RecentPost[];
  noticePostList: T.NoticePost[];
  footprintList: T.FootPrint[];
} = {
  recentlyPostList: [],
  noticePostList: [],
  footprintList: [],
};

export default (() => {
  let instance: HomeStore | undefined;
  const initialize = (initialState = initialHome) => ({
    ...homeStore,
    ...initialState,
  });
  return (initialState = initialHome) => {
    if (!instance) {
      instance = initialize(initialState);
    }
    return observable(instance);
  };
})();
