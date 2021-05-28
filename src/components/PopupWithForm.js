import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
  }

  // Метод для сбора данных с полей
  _getInputValues() {
    const values = {}
console.log(values);
    const inputs = [...this._form.querySelectorAll('.popup__input')];
    inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  // Метод закрытия по крестику и обработчик сабмита
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }
}
