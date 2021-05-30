import { Popup } from './Popup.js';

export class PopupWithDeleteBtn extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  // При сабмите запускаем функцию, которую передали при открытии попапа
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitHandler();
    });
  }

  open(submitHandler) {
    super.open();
    this._submitHandler = submitHandler;
  }
}
