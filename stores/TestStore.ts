import { observable, action } from 'mobx';

class Todo {
  root: any;
  @observable test: string = 'hello mobx!';

  constructor(root: any) {
    this.root = root;
  }

  @action testPrint = (): void => {
    console.log(this.test);
  };
}

export default Todo;
