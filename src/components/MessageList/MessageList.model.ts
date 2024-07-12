import { makeAutoObservable } from "mobx";

class MessageListModel {
  constructor() {
    makeAutoObservable(this);
  }

  // Define your state and actions here
}

export default new MessageListModel();
