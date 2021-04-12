let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');
let places = document.querySelector('.places__card');

// Находим кнопки "Редактировать" и "Закрыть"
let editButton = profile.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-button');

// Находим поля "Имя" и "О себе"
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

// Находим форму
let formElement = popup.querySelector('.popup__form');

// Находим поля формы
let nameInput = formElement.querySelector('.popup__input_title_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__input_title_job'); // Воспользуйтесь инструментом .querySelector()

// Функция для открытия редактирования
function clickEditButton() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

editButton.addEventListener('click', clickEditButton);

// Функция для закрытия

function clickCloseButton() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', clickCloseButton);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  clickCloseButton();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
