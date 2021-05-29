import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._button = this._popup.querySelector('.popup__save-button');
    this._originalBtnText = this._button.textContent;
  }

  // Метод для сбора данных с полей
  _getInputValues() {
    const values = {}
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

  // Метод отрисовки UX при отправке формы
  renderLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = 'Сохранение...';
    } else {
      this._button.textContent = this._originalBtnText;
    }
  }
}


