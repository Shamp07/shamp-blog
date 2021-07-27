import { makeObservable } from 'mobx';

import Axios from '@util/Axios';
import makeAnnotations from 'util/Mobx';
import * as T from '@types';

class CategoryStore {
  categoryTags: string[] = [];

  constructor(initialData = initialCategory) {
    this.categoryTags = initialData.categoryTags;
    makeObservable(this, makeAnnotations<this>({
      observables: ['categoryTags'],
      actions: ['getCategoryTags'],
    }));
  }

  getCategoryTags = async (category: string) => {
    await Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/category/tag`,
      data: { category },
      success: (response) => {
        const { result } = response.data;
        this.categoryTags = result.map((row: T.Tag) => row.tag);
      },
    });
  };
}

export const initialCategory = {
  categoryTags: [] as string[],
};

export default CategoryStore;
