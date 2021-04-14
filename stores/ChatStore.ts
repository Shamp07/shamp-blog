import { makeObservable } from 'mobx';
import React from 'react';
import socketio from 'socket.io-client';
import makeAnnotations from '../util/Mobx';
import Axios from '../util/Axios';

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
  };

  connectSocket = () => {
    this.chatSocket = socketio.connect('http://localhost');
    this.chatSocket.emit('get_socket_id');
    this.chatSocket.on('send_socket_id', this.updateSocketId);
  };

  updateSocketId = (socketId: string) => {
    Axios({
      method: 'put',
      url: '/api/chat/socket',
      data: {
        socketId,
      },
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
