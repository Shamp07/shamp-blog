import { makeObservable } from 'mobx';
import React from 'react';
import makeAnnotations from '../util/Mobx';

class ChatStore {
  isChatOpen = false;

  chat = '';

  constructor() {
    makeObservable(this, makeAnnotations<this>({
      observables: ['isChatOpen', 'chat'],
      actions: ['openChat', 'onChangeChat'],
    }));
  }

  openChat = (): void => {
    this.isChatOpen = !this.isChatOpen;
  };

  onChangeChat = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.chat = event.target.value;
  };
}

export default ChatStore;
