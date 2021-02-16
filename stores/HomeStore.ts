import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import AlertStore from './AlertStore';

class HomeStore {
  AlertStore: AlertStore;

  @observable recentlyPostList = [];

  @observable noticePostList = [];

  @observable footprintList = [];

  @observable footprintSize: number = 20;

  @observable footprintText: string = '';

  @observable modifierFootprintText: string = '';

  @observable modifierFootprintId: number = 0;

  constructor(initialData = initialHome, root: any) {
    makeObservable(this);
    this.recentlyPostList = initialData.recentlyPostList;
    this.noticePostList = initialData.noticePostList;
    this.footprintList = initialData.footprintList;
    this.AlertStore = root.AlertStore;
  }

  @action setModifierFootprintId = (id: number, content: string): void => {
    this.modifierFootprintId = id;
    this.modifierFootprintText = content;
  };

  @action footprintHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length <= 1000) {
      this.footprintText = event.target.value;
    }
  };

  @action modifierFootprintHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length <= 1000) {
      this.modifierFootprintText = event.target.value;
    }
  };

  @action getRecentlyPostList = async (): Promise<void> => {
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

  @action getNoticePostList = async (): Promise<void> => {
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

  @action addFootprint = (userId: number): void => {
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

  @action moreFootprint = (): void => {
    this.footprintSize += 20;
    this.getFootprint();
  };

  @action getFootprint = async (): Promise<void> => {
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

  @action modifyFootprint = (id: number): void => {
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

  @action deleteFootprint = (id: number): void => {
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
