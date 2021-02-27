import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';

class CategoryStore {
  categoryTags = [];

  constructor(initialData = initialCategory) {
    this.categoryTags = initialData.categoryTags;
    makeObservable(this, {
      categoryTags: observable,
      getCategoryTags: action,
    });
  }

  getCategoryTags = async (category: string): Promise<void> => {
    await axios.get(`${process.env.BASE_PATH}/api/category/tag`, {
      params: {
        category,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          const { result } = data;
          this.categoryTags = result;
        } else {
          console.warn(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };
}

export const initialCategory = {
  categoryTags: [],
};

export default CategoryStore;
