import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class CategoryStore {
  root: any;

  @observable categoryTags = [];

  constructor(initialData = initialCategory) {
    makeObservable(this);
    this.categoryTags = initialData.categoryTags;
  }

  @action getCategoryTags = async (category: string) => {
    console.log('통신시작');
    await axios.get('http://localhost:3000/api/category/tag', {
      params: {
        category,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          const { result } = data;
          console.log('통신끝');
          this.categoryTags = result;
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };
}

export const initialCategory = {
  categoryTags: [],
};

export default CategoryStore;
