import '../pages/index.css';
import { initialCards } from '../utils/initial-сards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import {
  places, editButton, addButton, formEditElement, formAddElement,
  nameInput, jobInput, placeInput, linkInput, configValidation,
  popupEdit, popupAdd, popupCard, profileName, profileJob
} from '../utils/constants.js';

// Запускаем валидацию форм
const formEditValidation = new FormValidator(configValidation, formEditElement);
formEditValidation.enableValidation();
const formAddValidation = new FormValidator(configValidation, formAddElement);
formAddValidation.enableValidation();

// Функция создания карточки
function generateCard(data) {
  const card = new Card(data, '#card-template', handleCardClick);
  return card.createCard();
}

// Рендерим начальные карточки
const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    defaultCardList.addItem(generateCard(item));
  }
}, places);

defaultCardList.renderItems();

// Создаём экземпляры классов для работы с модальными окнами
const userInfo = new UserInfo({ nameSelector: profileName, jobSelector: profileJob });
const popupEditForm = new PopupWithForm(popupEdit, handleEditFormSubmit);
const popupAddForm = new PopupWithForm(popupAdd, handleAddFormSubmit);
const popupFullImage = new PopupWithImage(popupCard);

// Функция клика по карточке
function handleCardClick(name, link) {
  popupFullImage.open(name, link);
}
popupFullImage.setEventListeners();

// Функция редактирования профиля
function handleEditFormSubmit() {
  userInfo.setUserInfo(nameInput, jobInput);
  popupEditForm.close();
}

// Функция добавления карточки
function handleAddFormSubmit() {
  const newCard = {
    name: placeInput.value,
    link: linkInput.value
  }
  defaultCardList.addItem(generateCard(newCard));
  popupAddForm.close();
}

// Вешаем слушатель на кнопку редактирования профиля
editButton.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  formEditValidation.clearErrorData();
  popupEditForm.open();
});
popupEditForm.setEventListeners();

// Вешаем слушатель на кнопку формы добавления
addButton.addEventListener('click', () => {
  formAddElement.reset();
  formAddValidation.clearErrorData();
  popupAddForm.open();
});
popupAddForm.setEventListeners();
