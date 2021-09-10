import { ChangeEvent } from 'react';
import { observable } from 'mobx';

import Axios from '@util/axios';
import * as T from '@types';
import alertStore from './alertStore';

export interface HomeStore {
  recentlyPostList: T.RecentPost[];
  noticePostList: T.NoticePost[];
  footprintList: T.FootPrint[];
  footprintSize: number;
  footprintInfo: {
    footprint: string;
    modifierFootprint: string;
  };
  modifierFootprintId: number;
  setModifierFootprintId(id: number, content: string): void;
  footprintHandleChange(event: ChangeEvent<HTMLTextAreaElement>): void;
  getRecentlyPostList(): Promise<void>;
  getNoticePostList(): Promise<void>;
  addFootprint(): void;
  moreFootprint(): void;
  getFootprint(): Promise<void>;
  modifyFootprint(id: number): void;
  deleteFootprint(id: number): void;
}

const homeStore: HomeStore = {
  recentlyPostList: [],
  noticePostList: [],
  footprintList: [],
  footprintSize: 20,
  footprintInfo: {
    footprint: '',
    modifierFootprint: '',
  },
  modifierFootprintId: 0,
  setModifierFootprintId(id, content) {
    this.modifierFootprintId = id;
    this.footprintInfo.modifierFootprint = content;
  },
  footprintHandleChange(event) {
    if (event.target.value.length <= 1000) {
      this.footprintInfo = {
        ...this.footprintInfo,
        [event.target.name]: event.target.value,
      };
    }
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
  addFootprint() {
    if (!this.footprintInfo.footprint.trim()) {
      alertStore.toggleAlertModal('발자취 내용을 입력해주세요!');
      return;
    }

    Axios({
      method: T.RequestMethod.POST,
      url: '/api/footprint',
      data: {
        content: this.footprintInfo.footprint,
      },
      success: () => {
        this.getFootprint();
        this.footprintInfo.footprint = '';
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
  modifyFootprint(id) {
    Axios({
      method: T.RequestMethod.PUT,
      url: '/api/footprint',
      data: {
        id,
        content: this.footprintInfo.modifierFootprint,
      },
      success: () => {
        this.getFootprint();
        this.setModifierFootprintId(0, '');
      },
    });
  },
  deleteFootprint(id) {
    Axios({
      method: T.RequestMethod.DELETE,
      url: '/api/footprint',
      data: { id },
      success: this.getFootprint,
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
