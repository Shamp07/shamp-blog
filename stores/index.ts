import { enableStaticRendering } from 'mobx-react-lite';
// import { initialPost } from './PostStore';
// import { initialCategory } from './CategoryStore';
// import { initialComment } from './CommentStore';
// import { initialHome } from './HomeStore';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

// export const initialRoot = {
//   CategoryStore: initialCategory,
//   PostStore: initialPost,
//   CommentStore: initialComment,
//   HomeStore: initialHome,
// };
//

// export function initializeStore(initialData = initialRoot) {
//   if (isServer) {
//     return new RootStore(initialData);
//   }
//   if (store === null) {
//     store = new RootStore(initialData);
//   }
//   return store;
// }
