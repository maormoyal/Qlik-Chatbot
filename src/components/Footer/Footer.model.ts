import { makeAutoObservable } from "mobx";

class FooterModel {
  constructor() {
    makeAutoObservable(this);
  }

  // Define your state and actions here
}

export default new FooterModel();
