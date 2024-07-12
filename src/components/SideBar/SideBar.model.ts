import { makeAutoObservable } from "mobx";

class SideBarModel {
  constructor() {
    makeAutoObservable(this);
  }

  // Define your state and actions here
}

export default new SideBarModel();
