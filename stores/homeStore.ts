import { ChangeEvent } from 'react';
import { observable } from 'mobx';

import Axios from '@util/Axios';
import * as T from '@types';
import alertStore from './alertStore';

const homeStore = observable({
  recentlyPostList: [],
  noticePostList: [],
  footprintList: [],
  footprintSize: 20,
  footprintInfo: {
    footprint: '',
    modifierFootprint: '',
  },
  modifierFootprintId: 0,
  setModifierFootprintId(id: number, content: string) {
    this.modifierFootprintId = id;
    this.footprintInfo.modifierFootprint = content;
  },
  footprintHandleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    if (event.target.value.length <= 1000) {
      this.footprintInfo = {
        ...this.footprintInfo,
        [event.target.name]: event.target.value,
      };
    }
  },
  // async await
  getRecentlyPostList() {
    Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/post/list/recently`,
      success: (response) => {
        const { result } = response.data;
        this.recentlyPostList = result;
      },
    });
  },
  // async await
  getNoticePostList() {
    Axios({
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
  // async await
  getFootprint() {
    Axios({
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
  modifyFootprint(id: number) {
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
  deleteFootprint(id: number) {
    Axios({
      method: T.RequestMethod.DELETE,
      url: '/api/footprint',
      data: { id },
      success: this.getFootprint,
    });
  },
});

export const initialHome = {
  recentlyPostList: [],
  noticePostList: [],
  footprintList: [] as T.FootPrint[],
};

export default homeStore;
