import { ChangeEvent } from 'react';
import { makeObservable } from 'mobx';

import Axios from '@util/Axios';
import makeAnnotations from '@util/Mobx';
import * as T from '@types';
import AlertStore from './AlertStore';

class HomeStore {
  AlertStore: AlertStore;

  recentlyPostList = [];

  noticePostList = [];

  footprintList: T.FootPrint[] = [];

  footprintSize = 20;

  footprintInfo = {
    footprint: '',
    modifierFootprint: '',
  };

  modifierFootprintId = 0;

  constructor(initialData = initialHome, root: { AlertStore: AlertStore }) {
    this.AlertStore = root.AlertStore;
    this.recentlyPostList = initialData.recentlyPostList;
    this.noticePostList = initialData.noticePostList;
    this.footprintList = initialData.footprintList;

    makeObservable(this, makeAnnotations<this>({
      observables: [
        'recentlyPostList', 'noticePostList', 'footprintList',
        'footprintSize', 'footprintInfo', 'modifierFootprintId',
      ],
      actions: [
        'setModifierFootprintId', 'footprintHandleChange', 'getRecentlyPostList',
        'getNoticePostList', 'addFootprint', 'moreFootprint',
        'getFootprint', 'modifyFootprint', 'deleteFootprint',
      ],
    }));
  }

  setModifierFootprintId = (id: number, content: string) => {
    this.modifierFootprintId = id;
    this.footprintInfo.modifierFootprint = content;
  };

  footprintHandleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= 1000) {
      this.footprintInfo = {
        ...this.footprintInfo,
        [event.target.name]: event.target.value,
      };
    }
  };

  getRecentlyPostList = async () => {
    await Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/post/list/recently`,
      success: (response) => {
        const { result } = response.data;
        this.recentlyPostList = result;
      },
    });
  };

  getNoticePostList = async () => {
    await Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/post/list/notice`,
      success: (response) => {
        const { result } = response.data;
        this.noticePostList = result;
      },
    });
  };

  addFootprint = () => {
    if (!this.footprintInfo.footprint.trim()) {
      this.AlertStore.toggleAlertModal('발자취 내용을 입력해주세요!');
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
  };

  moreFootprint = () => {
    this.footprintSize += 20;
    this.getFootprint();
  };

  getFootprint = async () => {
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
  };

  modifyFootprint = (id: number) => {
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
  };

  deleteFootprint = (id: number) => {
    Axios({
      method: T.RequestMethod.DELETE,
      url: '/api/footprint',
      data: { id },
      success: this.getFootprint,
    });
  };
}

export const initialHome = {
  recentlyPostList: [],
  noticePostList: [],
  footprintList: [] as T.FootPrint[],
};

export default HomeStore;
