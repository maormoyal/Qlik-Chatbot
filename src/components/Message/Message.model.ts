import { makeAutoObservable } from "mobx";

class MessageModel {
  constructor() {
    makeAutoObservable(this);
  }

  // Define your state and actions here
}

export default new MessageModel();
