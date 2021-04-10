import { makeObservable } from 'mobx';
import makeAnnotations from '../util/Mobx';
import React from "react";

class ChatStore {
  isChatOpen = false;

  chatHeight = 20;

  constructor() {
    makeObservable(this, makeAnnotations<this>({
      observables: ['isChatOpen', 'chatHeight'],
      actions: ['openChat', 'onHeight'],
    }));
  }

  openChat = (): void => {
    this.isChatOpen = !this.isChatOpen;
  };

  onHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.scrollHeight < 200) {
      this.chatHeight = event.currentTarget.scrollHeight;
    }
  };
}

export default ChatStore;
