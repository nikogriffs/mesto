import '../pages/index.css';
import { initialCards } from '../utils/initial-сards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import {
  editButton, addButton, formEditElement, formAddElement, nameInput, jobInput,
  placeInput, linkInput, configValidation
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
}, '.places__list');

defaultCardList.renderItems();

// Создаём экземпляры классов для работы с модальными окнами
const userInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__job' });
const popupEditForm = new PopupWithForm('.popup-edit', handleEditFormSubmit);
const popupAddForm = new PopupWithForm('.popup-add', handleAddFormSubmit);
const popupFullImage = new PopupWithImage('.popup-card');

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
