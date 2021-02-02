import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import AlertStore from './AlertStore';
import React from "react";

class HomeStore {
  AlertStore: AlertStore;

  @observable popularPostList = [];

  @observable noticePostList = [];

  @observable footprintList = [];

  @observable footprintSize: number = 20;

  @observable footprintText: string = '';

  @observable modifierFootprintText: string = '';

  @observable modifierFootprintId: number = 0;

  constructor(initialData = initialHome, root: any) {
    makeObservable(this);
    this.popularPostList = initialData.popularPostList;
    this.noticePostList = initialData.noticePostList;
    this.footprintList = initialData.footprintList;
    this.AlertStore = root.AlertStore;
  }

  @action setModifierCommentId = (id: number, content: string) => {
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

  @action getPopularPostList = async () => {
    await axios.get('http://localhost:3000/api/post/list/popular')
      .then((response) => {
        const { data } = response;
        if (data.success) {
          const { result } = data;
          this.popularPostList = result;
        } else {
          console.warn(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  @action getNoticePostList = async () => {
    await axios.get('http://localhost:3000/api/post/list/notice')
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
          console.warn(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  @action moreFootprint = () => {
    this.footprintSize += 20;
    this.getFootprint();
  };

  @action getFootprint = async (): Promise<any> => {
    await axios.get('http://localhost:3000/api/footprint', {
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
      content: this.footprintText,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.getFootprint();
        } else {
          console.warn(data.message);
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
          console.warn(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };
}

export const initialHome = {
  popularPostList: [],
  noticePostList: [],
  footprintList: [],
};

export default HomeStore;
