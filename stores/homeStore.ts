import { observable } from 'mobx';

import Axios from '@utilities/axios';
import * as T from '@types';

export interface HomeStore {
  recentPosts: T.HomePost[];
  noticePosts: T.HomePost[];
  footprints: T.FootPrint[];
  getRecentPosts(): Promise<void>;
  getNoticePosts(): Promise<void>;
  addFootprint(footprint: string, size: number): void;
  getFootprint(size?: number): Promise<void>;
  modifyFootprint(id: number, content: string, size: number): void;
  deleteFootprint(id: number, size: number): void;
}

const homeStore: HomeStore = {
  recentPosts: [],
  noticePosts: [],
  footprints: [],
  async getRecentPosts() {
    await Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/post/list/recently`,
      success: (response) => {
        const { result } = response.data;
        this.recentPosts = result;
      },
    });
  },
  async getNoticePosts() {
    await Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/post/list/notice`,
      success: (response) => {
        const { result } = response.data;
        this.noticePosts = result;
      },
    });
  },
  addFootprint(footprint, size) {
    Axios({
      method: T.RequestMethod.POST,
      url: '/api/footprint',
      data: {
        content: footprint,
      },
      success: () => {
        this.getFootprint(size);
      },
    });
  },
  async getFootprint(size = 10) {
    await Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/footprint`,
      data: { size },
      success: (response) => {
        const { result } = response.data;
        this.footprints = result;
      },
    });
  },
  modifyFootprint(id, content, size) {
    Axios({
      method: T.RequestMethod.PUT,
      url: '/api/footprint',
      data: {
        id,
        content,
      },
      success: () => {
        this.getFootprint(size);
      },
    });
  },
  deleteFootprint(id, size) {
    Axios({
      method: T.RequestMethod.DELETE,
      url: '/api/footprint',
      data: { id },
      success: () => {
        this.getFootprint(size);
      },
    });
  },
};

export const initialHome: {
  recentPosts: T.HomePost[];
  noticePosts: T.HomePost[];
  footprints: T.FootPrint[];
} = {
  recentPosts: [],
  noticePosts: [],
  footprints: [],
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
