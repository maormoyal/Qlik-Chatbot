import { makeAutoObservable } from "mobx";

class ChatModel {
  constructor() {
    makeAutoObservable(this);
  }

  // Define your state and actions here
}

export default new ChatModel();
