import { makeObservable } from 'mobx';
import React from 'react';
import socketio from 'socket.io-client';
import dayjs from 'dayjs';
import makeAnnotations from '../util/Mobx';
import Axios from '../util/Axios';
import AlertStore from './AlertStore';

export interface ChatType {
  id: number;
  fromUserName?: string;
  fromUserId: number;
  message: string;
  time: string;
  displayedTime: string;
}

export interface ChatRoomType {
  id: number;
  fromUserId: number;
  fromUserName: string;
  toUserId: number;
  toUserName: string;
  message: string;
  time: string;
}

class ChatStore {
  AlertStore: AlertStore;

  isChatOpen = false;

  isChatLoading = true;

  chatRoomList: Array<ChatRoomType> = [];

  // 0: ChatLobby
  // 1: ChatRoom
  chatPage = 0;

  chat = '';

  chatList: Array<ChatType> = [];

  toUserId = -1;

  chatTempId = 0;

  chatSocket: SocketIOClient.Socket | null = null;

  socketId = '';

  constructor(root: { AlertStore: AlertStore }) {
    this.AlertStore = root.AlertStore;
    makeObservable(this, makeAnnotations<this>({
      observables: [
        'isChatOpen', 'chat', 'chatList', 'chatRoomList',
        'chatPage', 'isChatLoading',
      ],
      actions: [
        'openChat', 'onChangeChat', 'getChatList', 'moveChatPage',
        'sendChat',
      ],
      computeds: ['displayedChatList'],
    }));
  }

  openChat = (loggedIn: boolean, isAdmin: boolean): void => {
    if (!this.isChatOpen) {
      if (!loggedIn) {
        this.AlertStore.toggleAlertModal('채팅은 로그인 이후 이용하실 수 있습니다! 비회원은 곧 지원 예정입니다.');
        return;
      }

      if (isAdmin) {
        this.chatPage = 0;
        this.getChatRoomList();
      } else {
        this.chatPage = 1;
      }
    }
    this.isChatOpen = !this.isChatOpen;
  };

  connectSocket = (userId: number) => {
    this.chatSocket = socketio.connect('http://localhost');
    this.chatSocket.emit('get_socket_id');
    this.chatSocket.on('send_socket_id', this.updateSocketId);
    this.chatSocket.on('receive_message', (message: string) => {
      alert('메시지가 도착했습니다.');
      this.chatList.push({
        fromUserId: userId,
        message,
        time: '',
      });
    });
  };

  getSocketId = () => {
    Axios({
      method: 'get',
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

  getChatRoomList = () => {
    this.isChatLoading = true;
    Axios({
      method: 'get',
      url: '/api/chat/room',
      success: (response) => {
        const { result } = response.data;
        this.chatRoomList = result;
        this.isChatLoading = false;
      },
    });
  };

  get displayedChatList(): Array<ChatType> {
    let beforeTime = '';
    return this.chatList.map((data) => {
      const { time } = data;
      const displayedTime = beforeTime === time ? '' : time;
      beforeTime = time;
      return {
        ...data,
        displayedTime,
      };
    });
  }

  getChatList = (userId: number) => {
    this.isChatLoading = true;
    Axios({
      method: 'get',
      url: '/api/chat',
      data: {
        userId,
      },
      success: (response) => {
        const { result } = response.data;
        this.chatList = result;
        this.isChatLoading = false;
      },
    });
  };

  addChat = async (userId: number, toUserId: number, time: string, displayedTime: string) => {
    await Axios({
      method: 'post',
      url: '/api/chat',
      data: {
        userId: toUserId,
        message: this.chat,
      },
      success: () => {
        this.chatList = [
          ...this.chatList,
          {
            id: this.chatTempId,
            fromUserId: userId,
            message: this.chat,
            time,
            displayedTime,
          },
        ];
      },
    });
  };

  onChangeChat = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.chat = event.target.value;
  };

  moveChatPage = (page: number, userId: number) => {
    if (page === 0) {
      this.getChatRoomList();
    } else if (page === 1) {
      this.getChatList(userId);
      this.toUserId = userId;
    }
    this.chatPage = page;
  };

  sendChat = async (userId: number) => {
    if (!this.chatSocket) return;
    this.chatSocket.emit('send_message', {
      message: this.chat,
      socketId: this.socketId,
    });

    const time = dayjs().format('hh:mm A');

    const displayedTime = ((): string => {
      if (this.chatList.length <= 0) {
        return '';
      }

      return this.chatList[this.chatList.length - 1].time === time ? '' : time;
    })();

    await this.addChat(userId, this.toUserId, time, displayedTime);
    this.chatTempId -= 1;
    this.chat = '';
  };

  onKeyPressChat = (event: React.KeyboardEvent<HTMLTextAreaElement>, userId: number) => {
    if (event.key === 'Enter') {
      this.sendChat(userId);
      return false;
    }
  };
}

export default ChatStore;
