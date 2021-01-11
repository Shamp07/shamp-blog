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
    await axios.get('http://127.0.0.1:3000/api/category/tag', {
      params: {
        category,
      },
    })
      .then((response) => {
        console.log('getCategoryTags - response');
        const { data } = response;
        if (data.success) {
          const { result } = data;
          console.log(result);
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
