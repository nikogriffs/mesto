import { escButton } from '../utils/constants.js';

export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  // Метод открытия попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('mousedown', this._closePopupOnOverlay);
  }

  // Метод закрытия попапа
  close = () => {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('mousedown', this._closePopupOnOverlay);
  }

  //Метод выхода по Escape
  _handleEscClose = (evt) => {
    if (evt.key === escButton) {
      this.close();
    }
  }

  // Метод выхода по оверлею
  _closePopupOnOverlay = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  // Метод закрытия по иконке закрытия и оверлею
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }
}
