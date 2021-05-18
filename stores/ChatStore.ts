import { makeObservable } from 'mobx';
import React from 'react';
import socketio from 'socket.io-client';
import dayjs from 'dayjs';
import makeAnnotations from '../util/Mobx';
import Axios from '../util/Axios';
import AlertStore from './AlertStore';

export interface ChatType {
  id: number;
  fromUserName: string;
  fromUserId: number;
  message: string;
  time: string;
  displayedTime?: string;
  isSimple?: boolean;
}

export interface ChatRoomListType {
  id: number;
  fromUserId: number;
  fromUserName: string;
  toUserId: number;
  toUserName: string;
  message: string;
  time: string;
  timeStamp: number;
  notReadChatCount: number;
}

interface ChatRoom {
  [userId: number]: ChatRoomListType;
}

interface ReceiveMessageType {
  message: string,
  fromUserId: number,
}

class ChatStore {
  AlertStore: AlertStore;

  isChatOpen = false;

  isChatLoading = true;

  // 0: ChatLobby
  // 1: ChatRoom
  chatPage = 0;

  chat = '';

  chatRoom: ChatRoom = {};

  chatList: Array<ChatType> = [];

  toUserId = -1;

  toUserName = 'Shamp';

  chatTempId = 0;

  chatSocket: SocketIOClient.Socket | null = null;

  socketId = '';

  scrollRef: React.RefObject<HTMLDivElement> | null = null;

  constructor(root: { AlertStore: AlertStore }) {
    this.AlertStore = root.AlertStore;
    makeObservable(this, makeAnnotations<this>({
      observables: [
        'isChatOpen', 'chat', 'chatList', 'chatPage',
        'isChatLoading', 'scrollRef', 'chatRoom',
      ],
      actions: [
        'openChat', 'onChangeChat', 'getChatList', 'moveChatPage',
        'sendChat', 'setScrollRef', 'clearChatList', 'receiveChat',
        'insertChatRoom', 'readChat',
      ],
      computeds: ['chatRoomList', 'displayedChatList', 'notReadChatCount'],
    }));
  }

  clearChatList = () => {
    this.chatList = [{
      id: 0,
      fromUserName: 'Shamp',
      fromUserId: 0,
      message: '안녕하세요. 블로그에 관련된 건의사항이나, 질문들을 자유롭게 보내주세요!',
      time: '',
    }];
  };

  setScrollRef = (ref: React.RefObject<HTMLDivElement>) => {
    this.scrollRef = ref;
  };

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
        this.getChatListSet(0);
      }
    }
    this.isChatOpen = !this.isChatOpen;
  };

  getChatListSet = async (userId: number) => {
    this.isChatLoading = true;
    this.toUserId = userId;
    await this.getChatList(userId);
    setTimeout(this.scrollToBottom, 0);
    this.isChatLoading = false;
  };

  connectSocket = (userId: number) => {
    this.chatSocket = socketio.connect('http://localhost');
    this.chatSocket.emit('connect_client', userId);
    this.chatSocket.on('receive_message', this.receiveChat);
  };

  receiveChat = ({ message, fromUserId }: ReceiveMessageType) => {
    if (this.toUserId === fromUserId && this.isChatOpen) {
      this.chatTempId -= 1;
      this.chatList = [
        ...this.chatList,
        {
          id: this.chatTempId,
          fromUserId,
          fromUserName: this.toUserName,
          message,
          time: this.getChatTime(),
          displayedTime: '',
        },
      ];
      this.scrollToBottom();
    } else if (this.chatPage === 0) {
      this.insertChatRoom(fromUserId, message);
    } else if (this.chatPage === 1) {
      this.chatRoom[fromUserId].notReadChatCount =
        Number(this.chatRoom[fromUserId].notReadChatCount) + 1;
    }
  };

  insertChatRoom = (fromUserId: number, message: string) => {
    this.chatRoom = {
      ...this.chatRoom,
      [fromUserId]: {
        ...this.chatRoom[fromUserId],
        message,
        timeStamp: Number(this.getChatTimeStamp()),
        time: this.getChatTime(),
        notReadChatCount: Number(this.chatRoom[fromUserId].notReadChatCount) + 1,
      },
    };
  };

  getChatRoomList = () => {
    this.isChatLoading = true;
    Axios({
      method: 'get',
      url: '/api/chat/room',
      success: (response) => {
        const { result } = response.data;
        result.forEach((data: ChatRoomListType) => {
          const { fromUserId } = data;
          this.chatRoom[Number(fromUserId)] = data;
        });
        this.isChatLoading = false;
      },
    });
  };

  get chatRoomList(): Array<ChatRoomListType> {
    return Object.keys(this.chatRoom)
      .map((id) => this.chatRoom[Number(id)])
      .sort(({ timeStamp: pts }, { timeStamp: ts }) => Number(ts) - Number(pts));
  }

  get notReadChatCount(): number {
    let count = 0;
    Object.keys(this.chatRoom)
      .forEach((id) => {
        count += Number(this.chatRoom[Number(id)].notReadChatCount);
      });
    return count;
  }

  get displayedChatList(): Array<ChatType> {
    let beforeTime = '';
    let beforeFromUserId = -1;

    return this.chatList.map((data, index) => {
      // 첫 메시지 시간 설정하는 부분
      if (index === 0 && this.chatList[index].id === 0) {
        if (this.chatList[index + 1]) {
          return {
            ...data,
            displayedTime: this.chatList[index + 1].time,
          };
        }

        return {
          ...data,
          displayedTime: this.getChatTime(),
        };
      }

      const { fromUserId, time } = data;
      // 전 메시지와 보낸시간이 같고, 전에 보낸 송신자가 동일하면 메시지 축양형으로 설정
      const isSimple = (beforeTime === time && beforeFromUserId === fromUserId);

      beforeTime = time;
      beforeFromUserId = fromUserId;

      return {
        ...data,
        isSimple,
        displayedTime: time,
      };
    });
  }

  getChatList = async (userId: number) => {
    this.clearChatList();
    await Axios({
      method: 'get',
      url: '/api/chat',
      data: {
        userId,
      },
      success: (response) => {
        const { result } = response.data;
        this.chatList = [
          ...this.chatList,
          ...result,
        ];
      },
    });
  };

  addChat = async (userId: number, toUserId: number, time: string) => {
    await Axios({
      method: 'post',
      url: '/api/chat',
      data: {
        userId: toUserId,
        message: this.chat,
      },
      success: () => {
        this.chatTempId -= 1;
        this.chatList = [
          ...this.chatList,
          {
            id: this.chatTempId,
            fromUserName: '',
            fromUserId: userId,
            message: this.chat,
            time,
          },
        ];
      },
    });
  };

  onChangeChat = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.chat = event.target.value;
  };

  moveChatPage = async (page: number, userId: number, userName: string) => {
    this.toUserName = userName;
    if (page === 0) {
      this.getChatRoomList();
    } else if (page === 1) {
      await this.getChatListSet(userId);
      this.readChat(userId);
    }
    this.chatPage = page;
  };

  readChat = (userId: number) => {
    this.chatRoom[userId].notReadChatCount = 0;
  };

  sendChat = async (userId: number) => {
    if (!this.chat) return;
    if (!this.chatSocket) return;
    this.chatSocket.emit('send_message', {
      message: this.chat,
      toUserId: this.toUserId,
      fromUserId: userId,
    });

    const time = this.getChatTime();
    await this.addChat(userId, this.toUserId, time);
    this.scrollToBottom();

    this.chatTempId -= 1;
    this.chat = '';
  };

  onKeyPressChat = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
    userId: number,
  ) => {
    if (event.key === 'Enter') {
      this.sendChat(userId);
      event.preventDefault();
    }

    return true;
  };

  scrollToBottom = () => {
    const { scrollRef } = this;
    if (scrollRef?.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      scrollRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  getChatTime = () => dayjs().format('hh:mm A');

  getChatTimeStamp = () => dayjs().format('YYYYMMDDHHmmss');
}

export default ChatStore;
