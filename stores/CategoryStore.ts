import { action, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

class CategoryStore {
  root: any;

  @observable categoryTags = [];

  constructor(root: any) {
    this.root = root;
  }

  @action getCategoryTags = async (category: string) => {
    await axios.post('/api/category/tag', category)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          const { result } = data;
          this.categoryTags = result;
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response);
      });
  };
}

export default CategoryStore;
