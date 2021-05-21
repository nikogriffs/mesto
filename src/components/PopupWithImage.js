import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  // Метод открытия попапа с картинкой
  open = (evt) => {
    this._popup.querySelector('.popup__caption').textContent = evt.target.alt;
    this._popup.querySelector('.popup__image').src = evt.target.src;
    this._popup.querySelector('.popup__image').alt = evt.target.alt;
    super.open();
  }
}
