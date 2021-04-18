// Находим необходимые элементы для дальнейшей работы в ДОМ
const profile = document.querySelector('.profile');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupCard = document.querySelector('.popup-card');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const places = document.querySelector('.places__list');
const template = document.querySelector('#card-template').content;

// Находим кнопки "Добавления", "Редактирования", "Закрытия"
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');
const popupCardCloseButton = popupCard.querySelector('.popup__close-button');

// Находим поля "Имя" и "О себе" на сайте
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

// Находим формы
const formEditElement = popupEdit.querySelector('.popup__form');
const formAddElement = popupAdd.querySelector('.popup__form');

// Находим поля форм "Имя", "О себе", "Название", "Ссылка на картинку"
const nameInput = formEditElement.querySelector('.popup__input_title_name');
const jobInput = formEditElement.querySelector('.popup__input_title_job');
const placeInput = formAddElement.querySelector('.popup__input_title_place');
const linkInput = formAddElement.querySelector('.popup__input_title_link');

// Универсальные функции открытия и закрытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  document.addEventListener('mousedown', closePopupOnOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  document.removeEventListener('mousedown', closePopupOnOverlay);
}

// Закрытие по оверлею
function closePopupOnOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')){
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// Закрытие попапа на Escape
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// Функция создания первоначальных карточек из готового массива и заготовки (template)
function createCard(card) {
  const cardTemplate = template.querySelector('.places__card').cloneNode(true);
  cardTemplate.querySelector('.places__title').textContent = card.name;
  cardTemplate.querySelector('.places__image').src = card.link;
  cardTemplate.querySelector('.places__image').alt = card.name;
  // Вешаем слушателей на элементы карточек из массива
  cardTemplate.querySelector('.places__like-button').addEventListener('click', handleLikeCard);
  cardTemplate.querySelector('.places__trash-button').addEventListener('click', handleDeleteCard);
  cardTemplate.querySelector('.places__image').addEventListener('click', openFullImage);
  return cardTemplate;
}

// Исполнение функции для массива с карточками
cards.forEach(function (evt) {
  places.append(createCard(evt));
});

// Функция попапа при клике на картинку
function openFullImage(evt) {
  popupCaption.textContent = evt.target.alt;
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  openPopup(popupCard);
}

// Функция для отметки лайков или снятия
function handleLikeCard(evt) {
  evt.target.classList.toggle('places__like-button_active');
}

// Функция для удаления карточки
function handleDeleteCard(evt) {
  evt.target.closest('.places__card').remove();
}

// Обработчик «отправки» формы в окне редактирования
function handleEditFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

// Обработчик «отправки» формы в окне добавления (функция добавление новых карточек)
function handleAddFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  const newCard = {
    name: placeInput.value,
    link: linkInput.value
  };
  places.prepend(createCard(newCard));
  closePopup(popupAdd);
}

//Слушатели клика по кнопке для открытия и закрытия попапов
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
  clearErrorData(formEditElement, validation);
});
addButton.addEventListener('click', () => {
  formAddElement.reset();
  openPopup(popupAdd)
  clearErrorData(formAddElement, validation);
});
popupEditCloseButton.addEventListener('click', () => closePopup(popupEdit));
popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));
popupCardCloseButton.addEventListener('click', () => closePopup(popupCard));
// Прикрепляем обработчик к формам:
// он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener('submit', handleEditFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit);
