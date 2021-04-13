import { makeObservable } from 'mobx';
import React from 'react';
import socketio from 'socket.io-client';
import makeAnnotations from '../util/Mobx';

class ChatStore {
  isChatOpen = false;

  chat = '';

  chatSocket: SocketIOClient.Socket | null = null;

  constructor() {
    makeObservable(this, makeAnnotations<this>({
      observables: ['isChatOpen', 'chat'],
      actions: ['openChat', 'onChangeChat'],
    }));
  }

  openChat = (): void => {
    this.isChatOpen = !this.isChatOpen;
    this.chatSocket = socketio.connect('http://localhost');

    this.chatSocket.on('receiveMessage', (data: any) => {
      alert(data.message);
    });
  };

  onChangeChat = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.chat = event.target.value;
  };

  sendChat = () => {
    if (!this.chatSocket) return;
    this.chatSocket.emit('sendMessage', { message: this.chat });
  };
}

export default ChatStore;
