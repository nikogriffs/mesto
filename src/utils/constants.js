export const places = document.querySelector('.places__list');
// Находим находим элементы модальных окон форм редактирования и добавления
export const popupEdit = document.querySelector('.popup-edit');
export const popupAdd = document.querySelector('.popup-add');
export const popupCard = document.querySelector('.popup-card');

// Находим кнопки "Добавления" и "Редактирования"
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const profileAvatar = document.querySelector('.profile__avatar');

export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

// Находим формы
export const formEditElement = popupEdit.querySelector('.popup__form');
export const formAddElement = popupAdd.querySelector('.popup__form');

// Находим поля форм "Имя", "О себе", "Название", "Ссылка на картинку"
export const nameInput = formEditElement.querySelector('.popup__input_title_name');
export const jobInput = formEditElement.querySelector('.popup__input_title_job');
export const placeInput = formAddElement.querySelector('.popup__input_title_place');
export const linkInput = formAddElement.querySelector('.popup__input_title_link');

// Конфиг валидации
export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__save-button',
  disabledButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_title_error',
  errorClass: 'popup__error_visible'
}

export const escButton = 'Escape';
