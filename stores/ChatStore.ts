import makeAnnotations from '../util/Mobx';
import {makeObservable} from "mobx";

class ChatStore {
  isChatOpen = false;

  constructor() {
    makeObservable(this,makeAnnotations<this>({
      observables: ['isChatOpen'],
      actions: ['openChat'],
    }));
  }

  openChat = (): void => {
    this.isChatOpen = !this.isChatOpen;
  };
}

export default ChatStore;
