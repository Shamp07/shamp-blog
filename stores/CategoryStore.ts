import { action, makeObservable, observable } from 'mobx';
import Axios from '../util/Axios';

export interface TagType {
  tags: string
}

class CategoryStore {
  categoryTags: Array<TagType> = [];

  constructor(initialData = initialCategory) {
    this.categoryTags = initialData.categoryTags;
    makeObservable(this, {
      categoryTags: observable,
      getCategoryTags: action,
    });
  }

  getCategoryTags = async (category: string): Promise<void> => {
    await Axios(
      'get',
      `${process.env.BASE_PATH}/api/category/tag`,
      {
        category,
      },
      (response) => {
        const { result } = response.data;
        this.categoryTags = result;
      },
    );
  };
}

export const initialCategory = {
  categoryTags: [] as Array<TagType>,
};

export default CategoryStore;
