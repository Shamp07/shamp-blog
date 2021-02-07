import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import PostStore from './PostStore';
import AlertStore from './AlertStore';

interface CommentInterface {
  id: number,
  commentId: number,
  userId: number,
  content: string,
  time: string,
}

class CommentStore {
  PostStore: PostStore;

  AlertStore: AlertStore;

  @observable comment: string = '';

  @observable replyComment: string = '';

  @observable modifierComment: string = '';

  @observable commentList: Array<CommentInterface> = [];

  @observable commentSize = 15;

  @observable modifierCommentId: number = 0;

  @observable replyCommentId: number = 0;

  constructor(initialData = initialComment, root: any) {
    makeObservable(this);
    this.PostStore = root.PostStore;
    this.AlertStore = root.AlertStore;
    this.commentList = initialData.commentList;
  }

  @action commentHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length <= 1000) {
      this.comment = event.target.value;
    }
  };

  @action replyCommentHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length <= 1000) {
      this.replyComment = event.target.value;
    }
  };

  @action modifierCommentHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length <= 1000) {
      this.modifierComment = event.target.value;
    }
  };

  @action setModifierCommentId = (id: number, content: string) => {
    this.modifierCommentId = id;
    this.modifierComment = content;
  };

  @action setReplyCommentId = (id: number) => {
    this.replyCommentId = id;
    this.replyComment = '';
  };

  @action addComment = (
    postId: number, userId: number,
    commentId: number, isReply: boolean,
  ): void => {
    if (!isReply && !this.comment.trim()) {
      this.AlertStore.toggleAlertModal('댓글 내용을 입력해주세요!');
      return;
    }

    if (isReply && !this.replyComment.trim()) {
      this.AlertStore.toggleAlertModal('답글 내용을 입력해주세요!');
      return;
    }

    axios.post('/api/post/comment', {
      postId,
      userId,
      commentId: isReply ? commentId : null,
      comment: isReply ? this.replyComment : this.comment,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.comment = '';
          this.setReplyCommentId(0);
          this.getComment(postId);
          this.PostStore.getPost(postId, false);
        } else {
          this.AlertStore.toggleAlertModal(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  @action moreComment = (postId: number): void => {
    this.commentSize += 15;
    this.getComment(postId);
  };

  @action getComment = async (postId: number): Promise<any> => {
    await axios.get('http://localhost:3000/api/post/comment', {
      params: {
        postId,
        commentSize: this.commentSize,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          const { result } = data;
          this.commentList = result;
        } else {
          console.warn(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  @action modifyComment = (commentId: number, postId: number): void => {
    axios.put('/api/post/comment', {
      commentId,
      comment: this.modifierComment,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.setModifierCommentId(0, '');
          this.PostStore.getPost(postId, false);
          this.getComment(postId);
        } else {
          this.AlertStore.toggleAlertModal(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };

  @action deleteComment = (commentId: number, postId: number): void => {
    axios.delete('/api/post/comment', {
      params: {
        commentId,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          this.getComment(postId);
          this.PostStore.getPost(postId, false);
        } else {
          this.AlertStore.toggleAlertModal(data.message);
        }
      })
      .catch((response) => {
        console.error(response);
      });
  };
}

export const initialComment = {
  commentList: [],
};

export default CommentStore;
