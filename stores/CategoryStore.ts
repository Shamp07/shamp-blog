import { makeObservable } from 'mobx';

import Axios from '@util/Axios';
import makeAnnotations from 'util/Mobx';
import * as T from '@types';

class CategoryStore {
  categoryTags: T.Tag[] = [];

  constructor(initialData = initialCategory) {
    this.categoryTags = initialData.categoryTags;
    makeObservable(this, makeAnnotations<this>({
      observables: ['categoryTags'],
      actions: ['getCategoryTags'],
    }));
  }

  getCategoryTags = async (category: string): Promise<void> => {
    await Axios({
      method: 'get',
      url: `${process.env.BASE_PATH}/api/category/tag`,
      data: { category },
      success: (response) => {
        const { result } = response.data;
        this.categoryTags = result;
      },
    });
  };
}

export const initialCategory = {
  categoryTags: [],
};

export default CategoryStore;
