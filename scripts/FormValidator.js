export class FormValidator {
  constructor(config, form) {
    this._configValidation = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._configValidation.inputSelector));
    this._submitButton = this._form.querySelector(this._configValidation.buttonSelector);
  }

  // 2. Метод перебора всех форм на странице, складываем в массив
  enableValidation() {
    const formArray = Array.from(document.querySelectorAll(this._configValidation.formSelector));
    formArray.forEach(() => {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    });
  }

  // 3. Метод перебора всех полей ввода на странице, складываем их в массив, также находим кнопку,
  // и проверяем её активность
  _setEventListeners() {
    this._switchButtonStatus(this._inputList, this._submitButton);
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._switchButtonStatus(this._inputList, this._submitButton);
      });
    });
  }

  // 4. Метод активации или отключения кнопки. Кнопка не активна, пока все поля не будут валидны
  _switchButtonStatus() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.classList.add(this._configValidation.disabledButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._configValidation.disabledButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  // 5. Проверяем, все ли поля валидны
  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  // 6. Проверяем, еcть ли ошибки при вводе
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

  // 7. Прячем сообщение об ошибке
  _hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._configValidation.inputErrorClass);
    error.classList.remove(this._configValidation.errorClass);
    error.textContent = '';
  }

  // 8. Показываем сообщение об ошибке
  _showError(input, errorMessage) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._configValidation.inputErrorClass);
    error.classList.add(this._configValidation.errorClass);
    error.textContent = errorMessage;
  }

  // 9. Дополнительный метод, работает при открытии попапа,
  // убирает сообщение об ошибке, если данные уже были введены, но не отправлены
  // и проверяет кнопку сохранить, если данные были отправлены
  clearErrorData() {
    this._inputList.forEach((input) => {
      this._hideError(input);
    });
    this._switchButtonStatus(this._inputList, this._submitButton);
  }
}
