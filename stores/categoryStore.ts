import { observable } from 'mobx';

import Axios from '@util/Axios';
import * as T from '@types';

const categoryStore = observable({
  categoryTags: [],
  // async await
  getCategoryTags(category: string) {
    Axios({
      method: T.RequestMethod.GET,
      url: `${process.env.BASE_PATH}/api/category/tag`,
      data: { category },
      success: (response) => {
        const { result } = response.data;
        this.categoryTags = result.map((row: T.Tag) => row.tag);
      },
    });
  },
});

export const initialCategory = {
  categoryTags: [] as string[],
};

export default categoryStore;
