import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import AlertStore from './AlertStore';
import Axios from '../util/Axios';

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

    makeObservable(this, {
      recentlyPostList: observable,
      noticePostList: observable,
      footprintList: observable,
      footprintSize: observable,
      footprintInfo: observable,
      modifierFootprintId: observable,
      setModifierFootprintId: action,
      footprintHandleChange: action,
      getRecentlyPostList: action,
      getNoticePostList: action,
      addFootprint: action,
      moreFootprint: action,
      getFootprint: action,
      modifyFootprint: action,
      deleteFootprint: action,
    });
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
    await Axios(
      'get',
      `${process.env.BASE_PATH}/api/post/list/recently`,
      {},
      (response) => {
        const { result } = response.data;
        this.recentlyPostList = result;
      },
    );
  };

  getNoticePostList = async (): Promise<void> => {
    await Axios(
      'get',
      `${process.env.BASE_PATH}/api/post/list/notice`,
      {},
      (response) => {
        const { result } = response.data;
        this.noticePostList = result;
      },
    );
  };

  addFootprint = (): void => {
    if (!this.footprintInfo.footprint.trim()) {
      this.AlertStore.toggleAlertModal('발자취 내용을 입력해주세요!');
      return;
    }

    Axios(
      'post',
      '/api/footprint',
      {
        content: this.footprintInfo.footprint,
      },
      () => {
        this.getFootprint();
        this.footprintInfo.footprint = '';
      },
    );
  };

  moreFootprint = (): void => {
    this.footprintSize += 20;
    this.getFootprint();
  };

  getFootprint = async (): Promise<void> => {
    await Axios(
      'get',
      `${process.env.BASE_PATH}/api/footprint`,
      {
        size: this.footprintSize,
      },
      (response) => {
        const { result } = response.data;
        this.footprintList = result;
      },
    );
  };

  modifyFootprint = (id: number): void => {
    Axios(
      'put',
      '/api/footprint',
      {
        id,
        content: this.footprintInfo.modifierFootprint,
      },
      () => {
        this.getFootprint();
        this.setModifierFootprintId(0, '');
      },
    );
  };

  deleteFootprint = (id: number): void => {
    Axios(
      'delete',
      '/api/footprint',
      {
        id,
      },
      () => {
        this.getFootprint();
      },
    );
  };
}

export const initialHome = {
  recentlyPostList: [],
  noticePostList: [],
  footprintList: [] as Array<FootPrintType>,
};

export default HomeStore;
