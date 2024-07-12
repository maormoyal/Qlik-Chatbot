import { makeAutoObservable } from "mobx";

class HeaderModel {
  constructor() {
    makeAutoObservable(this);
  }

  // Define your state and actions here
}

export default new HeaderModel();
