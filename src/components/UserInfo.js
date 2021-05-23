export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = nameSelector;
    this._job = jobSelector;
  }

  // Метод возвращает данные пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  // Метод принимает новые данные пользователя
  setUserInfo(nameInput, jobInput) {
    this._name.textContent = nameInput.value;
    this._job.textContent = jobInput.value;
  }
}
