import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import AlertStore from './AlertStore';

class HomeStore {
  AlertStore: AlertStore;

  recentlyPostList = [];

  noticePostList = [];

  footprintList = [];

  footprintSize: number = 20;

  footprintText: string = '';

  modifierFootprintText: string = '';

  modifierFootprintId: number = 0;

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
      footprintText: observable,
      modifierFootprintText: observable,
      modifierFootprintId: observable,
      setModifierFootprintId: action,
      footprintHandleChange: action,
      modifierFootprintHandleChange: action,
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
    this.modifierFootprintText = content;
  };

  footprintHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length <= 1000) {
      this.footprintText = event.target.value;
    }
  };

  modifierFootprintHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length <= 1000) {
      this.modifierFootprintText = event.target.value;
    }
  };

  getRecentlyPostList = async (): Promise<void> => {
    await axios.get(`${process.env.BASE_PATH}/api/post/list/recently`)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          const { result } = data;
          this.recentlyPostList = result;
        } else {
          console.warn(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  getNoticePostList = async (): Promise<void> => {
    await axios.get(`${process.env.BASE_PATH}/api/post/list/notice`)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          const { result } = data;
          this.noticePostList = result;
        } else {
          console.warn(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  addFootprint = (userId: number): void => {
    if (!this.footprintText.trim()) {
      this.AlertStore.toggleAlertModal('발자취 내용을 입력해주세요!');
      return;
    }

    axios.post('/api/footprint', {
      userId,
      content: this.footprintText,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.footprintText = '';
          this.getFootprint();
        } else {
          this.AlertStore.toggleAlertModal(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  moreFootprint = (): void => {
    this.footprintSize += 20;
    this.getFootprint();
  };

  getFootprint = async (): Promise<void> => {
    await axios.get(`${process.env.BASE_PATH}/api/footprint`, {
      params: {
        size: this.footprintSize,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          const { result } = data;
          this.footprintList = result;
        } else {
          console.warn(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  modifyFootprint = (id: number): void => {
    axios.put('/api/footprint', {
      id,
      content: this.modifierFootprintText,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.getFootprint();
          this.setModifierFootprintId(0, '');
        } else {
          this.AlertStore.toggleAlertModal(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  deleteFootprint = (id: number): void => {
    axios.delete('/api/footprint', {
      params: {
        id,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.getFootprint();
        } else {
          this.AlertStore.toggleAlertModal(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };
}

export const initialHome = {
  recentlyPostList: [],
  noticePostList: [],
  footprintList: [],
};

export default HomeStore;
