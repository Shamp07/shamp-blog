import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import { toast } from 'react-toastify';

interface CommentInterface {
  id: number,
  commentId: number,
  userId: number,
  content: string,
  time: string,
}

class CommentStore {
  @observable comment: string = '';

  @observable replyComment: string = '';

  @observable commentList: Array<CommentInterface> = [];

  @observable modifyCommentId: number = 0;

  @observable replyCommentId: number = 0;

  constructor(initialData = initialComment) {
    makeObservable(this);
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

  @action setModifyCommentId = (id: number) => {
    this.modifyCommentId = id;
  };

  @action setReplyCommentId = (id: number) => {
    this.replyCommentId = id;
    this.replyComment = '';
  };

  @action addComment = (
    postId: number, userId: number,
    commentId: number, isReply: boolean,
  ): void => {
    axios.post('/api/post/comment', {
      postId,
      userId,
      commentId: isReply ? commentId : null,
      comment: isReply ? this.replyComment : this.comment,
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          toast.success(data.message);
          this.comment = '';
          this.getComment(postId);
          this.setReplyCommentId(0);
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response);
      });
  };

  @action getComment = async (postId: number): Promise<any> => {
    await axios.get('http://localhost:3000/api/post/comment', {
      params: {
        postId,
      },
    })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          const { result } = data;
          this.commentList = result;
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response);
      });
  };

  @action modifyComment = (commentId: number, postId: number): void => {
    axios.put('/api/post/comment', { commentId })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          toast.success(data.message);
          this.getComment(postId);
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response);
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
          toast.success(data.message);
          this.getComment(postId);
        } else {
          toast.error(data.message);
        }
      })
      .catch((response) => {
        toast.error(response);
      });
  };
}

export const initialComment = {
  commentList: [],
};

export default CommentStore;
