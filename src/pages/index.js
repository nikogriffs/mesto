import '../pages/index.css';
import { initialCards } from '../utils/initial-сards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Api } from '../components/Api.js';
import {
  places, editButton, addButton, formEditElement, formAddElement,
  nameInput, jobInput, placeInput, linkInput, configValidation,
  popupEdit, popupAdd, popupCard, profileName, profileJob, profileAvatar
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: '8e28ef26-30e7-43b7-b459-31efb2dce5c1',
    'Content-Type': 'application/json'
  }
});

let defaultCardList = null;

// Рендерим начальные карточки
api.getInitialCards()
  .then((result) => {
    console.log(result);
    defaultCardList = new Section({
      items: result,
      renderer: (item) => {
        defaultCardList.addItem(generateCard(item));
      }
    }, places);

    defaultCardList.renderItems();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

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

// Создаём экземпляры классов для работы с модальными окнами
const userInfo = new UserInfo({ nameSelector: profileName, jobSelector: profileJob, avatarSelector: profileAvatar });
const popupEditForm = new PopupWithForm(popupEdit, handleEditFormSubmit);
const popupAddForm = new PopupWithForm(popupAdd, handleAddFormSubmit);
const popupFullImage = new PopupWithImage(popupCard);

api.getUserInfo()
  .then((result) => {
    console.log(result.avatar);
    userInfo.setUserInfo(result.name, result.about, result.avatar);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

// Функция клика по карточке
function handleCardClick(name, link) {
  popupFullImage.open(name, link);
}
popupFullImage.setEventListeners();


// Функция редактирования профиля
function handleEditFormSubmit() {
  api.setUserInfo(nameInput.value, jobInput.value)
    .then((result) => {
      console.log(result);
      userInfo.setUserInfo(result.name, result.about, result.avatar);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  popupEditForm.close();
}

// Функция добавления карточки
function handleAddFormSubmit() {
  api.createCard(placeInput.value, linkInput.value)
    .then((result) => {
      console.log(result);
      defaultCardList.addItem(generateCard(result));
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
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
