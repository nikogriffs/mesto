import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  // Метод открытия попапа с картинкой
  open(name, link) {
    this._popup.querySelector('.popup__caption').textContent = name;
    this._popup.querySelector('.popup__image').src = link;
    this._popup.querySelector('.popup__image').alt = name;
    super.open();
  }
}
