import React from 'react';
import { makeObservable } from 'mobx';
import AlertStore from './AlertStore';
import Axios from '../util/Axios';
import makeAnnotations from '../util/Mobx';

export interface FootPrintType {
  rownum: number;
  total: number;
  id: number;
  userId: number;
  userName: string;
  content: string;
  time: string;
  modifiedTime: string;
}

export interface HomePostType {
  id: number,
  title: string,
  commentCnt: number,
}

class HomeStore {
  AlertStore: AlertStore;

  recentlyPostList = [];

  noticePostList = [];

  footprintList: Array<FootPrintType> = [];

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

  setModifierFootprintId = (id: number, content: string): void => {
    this.modifierFootprintId = id;
    this.footprintInfo.modifierFootprint = content;
  };

  footprintHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length <= 1000) {
      this.footprintInfo = {
        ...this.footprintInfo,
        [event.target.name]: event.target.value,
      };
    }
  };

  getRecentlyPostList = async (): Promise<void> => {
    await Axios({
      method: 'get',
      url: `${process.env.BASE_PATH}/api/post/list/recently`,
      success: (response) => {
        const { result } = response.data;
        this.recentlyPostList = result;
      },
    });
  };

  getNoticePostList = async (): Promise<void> => {
    await Axios({
      method: 'get',
      url: `${process.env.BASE_PATH}/api/post/list/notice`,
      success: (response) => {
        const { result } = response.data;
        this.noticePostList = result;
      },
    });
  };

  addFootprint = (): void => {
    if (!this.footprintInfo.footprint.trim()) {
      this.AlertStore.toggleAlertModal('발자취 내용을 입력해주세요!');
      return;
    }

    Axios({
      method: 'post',
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

  moreFootprint = (): void => {
    this.footprintSize += 20;
    this.getFootprint();
  };

  getFootprint = async (): Promise<void> => {
    await Axios({
      method: 'get',
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

  modifyFootprint = (id: number): void => {
    Axios({
      method: 'put',
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

  deleteFootprint = (id: number): void => {
    Axios({
      method: 'delete',
      url: '/api/footprint',
      data: { id },
      success: () => this.getFootprint(),
    });
  };
}

export const initialHome = {
  recentlyPostList: [],
  noticePostList: [],
  footprintList: [] as Array<FootPrintType>,
};

export default HomeStore;
