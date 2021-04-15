import { makeObservable } from 'mobx';
import React from 'react';
import socketio from 'socket.io-client';
import makeAnnotations from '../util/Mobx';
import Axios from '../util/Axios';

export interface ChatType {
  fromUserId: number;
  toUserId: number;
  message: string;
  time: string;
}

class ChatStore {
  isChatOpen = false;

  chat = '';

  chatList: Array<ChatType> = [];

  chatSocket: SocketIOClient.Socket | null = null;

  socketId = '';

  constructor() {
    makeObservable(this, makeAnnotations<this>({
      observables: ['isChatOpen', 'chat', 'chatList'],
      actions: ['openChat', 'onChangeChat'],
    }));
  }

  openChat = (): void => {
    if (!this.isChatOpen) {
      this.getSocketId();
    }
    this.isChatOpen = !this.isChatOpen;
  };

  connectSocket = (userId: number) => {
    this.chatSocket = socketio.connect('http://localhost');
    this.chatSocket.emit('get_socket_id');
    this.chatSocket.on('send_socket_id', this.updateSocketId);
    this.chatSocket.on('receive_message', ({ message }: { message: string }) => {
      this.chatList.push({
        fromUserId: userId,
        toUserId: 0,
        message,
        time: '',
      });
    });
  };

  getSocketId = () => {
    Axios({
      method: 'put',
      url: '/api/chat/socket',
      data: {
        userId: 0,
      },
      success: (response) => {
        const { result } = response.data;
        this.socketId = result;
      },
    });
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

  sendChat = (userId: number) => {
    if (!this.chatSocket) return;
    this.chatSocket.emit('send_message', {
      message: this.chat,
      socketId: this.socketId,
    });

    this.chatList.push({
      fromUserId: userId,
      toUserId: 0,
      message: this.chat,
      time: '',
    });

    this.chat = '';
  };
}

export default ChatStore;
