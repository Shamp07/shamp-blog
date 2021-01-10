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
    await axios.get('/api/tag', {
      params: {
        category,
      },
    })
      .then((response) => {
        console.log('getCategoryTags - response');
        const { data } = response;
        if (data.success) {
          const { result } = data;
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        console.log('getCategory - Error');
        console.log(response);
      });
  };
}

export const initialCategory = {
  categoryTags: [],
};

export default CategoryStore;
