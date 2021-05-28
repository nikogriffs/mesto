import { Popup } from './Popup.js';

export class PopupWithDeleteBtn extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitHandler(this._cardId);
      this.close();
    });
  }




open(cardId) {
  super.open();
  this._cardId = cardId;
}

}
