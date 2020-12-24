import TestStore from './TestStore';

class RootStore {
  TestStore: TestStore;

  constructor() {
    this.TestStore = new TestStore(this);
  }
}

export default new RootStore();
