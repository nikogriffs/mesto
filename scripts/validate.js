const validation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__save-button',
  disabledButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_title_error',
  errorClass: 'popup__error_visible'
}

// 8. Показываем сообщение об ошибке
function showError(form, input, errorMessage, validation) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(validation.inputErrorClass);
  error.classList.add(validation.errorClass);
  error.textContent = errorMessage;
}

// 7. Прячем сообщение об ошибке
function hideError(form, input, validation) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(validation.inputErrorClass);
  error.classList.remove(validation.errorClass);
  error.textContent = '';
}

// 6. Проверяем, еcть ли ошибки при вводе
function checkInputValidity(form, input, validation) {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, validation);
  } else {
    hideError(form, input, validation);
  }
}

// 5. Проверяем, все ли поля валидны
function hasInvalidInput(inputArray) {
  return inputArray.some(function (input) {
    return !input.validity.valid;
  });
}

// 4. Функция активации или отключения кнопки. Кнопка не активна, пока все поля не будут валидны
function switchButtonStatus(inputArray, button, validation) {
  if (hasInvalidInput(inputArray)) {
    button.classList.add(validation.disabledButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(validation.disabledButtonClass);
    button.removeAttribute('disabled');
  }
}

// 3. Функция перебора всех полей ввода на странице, складываем их в массив, также находим кнопку,
// и проверяем её активность
function setEventListeners(form, validation) {
  const inputArray = Array.from(form.querySelectorAll(validation.inputSelector));
  const button = form.querySelector(validation.buttonSelector);
  switchButtonStatus(inputArray, button, validation);
  inputArray.forEach(function (input) {
    input.addEventListener('input', function () {
      checkInputValidity(form, input, validation);
      switchButtonStatus(inputArray, button, validation);
    });
  });
}

// 2. Функция перебора всех форм на странице, складываем в массив
function enableValidation(validation) {
  const formArray = Array.from(document.querySelectorAll(validation.formSelector));
  formArray.forEach(function (form) {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(form, validation);
  });
}

// 1. Запускаем функцию проверки валидации форм
enableValidation(validation);

// 0. Очистка сообщения об ошибке, при открытии попапа и
// активная кнопка сохранить при открытии попапа, если данные уже введены
// Убрал перебор форм, теперь функция работает на конкретную форму, и не создаётся лишний массив из форм
function clearErrorData(form, validation) {
  const inputArray = Array.from(form.querySelectorAll(validation.inputSelector));
  inputArray.forEach(function (input) {
    hideError(form, input, validation);
  });
  const button = form.querySelector(validation.buttonSelector)
  switchButtonStatus(inputArray, button, validation);
}
