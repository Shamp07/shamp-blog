import { observable } from 'mobx';

import Axios from '@utilities/axios';
import * as T from '@types';

export interface CategoryStore {
  tags: T.Tag[];
  getTags(category: string): Promise<void>;
}

const categoryStore: CategoryStore = {
  tags: [],
  async getTags(category) {
    await Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/category/tag`,
      data: { category },
      success: (response) => {
        const { result } = response.data;
        this.tags = result.map((row: { tag: T.Tag }) => row.tag);
      },
    });
  },
};

export const initialCategory: {
  tags: T.Tag[],
} = {
  tags: [],
};

export default (() => {
  let instance: CategoryStore | undefined;
  const initialize = (initialState = initialCategory) => ({
    ...categoryStore,
    ...initialState,
  });
  return (initialState = initialCategory) => {
    if (!instance) {
      instance = initialize(initialState);
    }
    return observable(instance);
  };
})();
