export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = nameSelector;
    this._job = jobSelector;
    this._avatar = avatarSelector;
    // this._myId = myId;
  }

  // Метод возвращает данные пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src,
      id: this._myId
    }
  }

  // Метод принимает новые данные пользователя
  setUserInfo(nameInput, jobInput, avatarImage, myId) {
    this._name.textContent = nameInput;
    this._job.textContent = jobInput;
    this._avatar.src = avatarImage;
    this._myId = myId;
  }

  // getMyId() {
  //   return this._myId;
  // }
}
