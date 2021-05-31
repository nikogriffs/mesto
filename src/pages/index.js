import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithDeleteBtn } from '../components/PopupWithDeleteBtn';
import { Api } from '../components/Api.js';
import {
  places, editButton, addButton, avatarButton, formEditElement, formAddElement, formAvatarElement,
  nameInput, jobInput, placeInput, linkInput, avatarInput, configValidation,
  popupEdit, popupAdd, popupCard, popupDelete, popupAvatar, profileName, profileJob, profileAvatar
} from '../utils/constants.js';

// Экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: '8e28ef26-30e7-43b7-b459-31efb2dce5c1'
  }
});

// Экземпляр класса Section
const cardSection = new Section((item) => {
    cardSection.addItem(generateCard(item), 'append');
  }, places)

// Получаем информацию о пользователе и начальные карточки с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user.name, user.about, user.avatar, user._id);
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

// Запускаем валидацию форм
const formEditValidation = new FormValidator(configValidation, formEditElement);
formEditValidation.enableValidation();
const formAddValidation = new FormValidator(configValidation, formAddElement);
formAddValidation.enableValidation();
const formAvatarValidation = new FormValidator(configValidation, formAvatarElement);
formAvatarValidation.enableValidation();

// Функция создания карточки
function generateCard(data) {
  // Вытаскимаем свой ID с сервера
  const myId = userInfo.getUserInfo().id;
  const card = new Card(data, myId, '#card-template', {
    // Функция открытия попапа картинки
    handleCardClick: (name, link) => {
      popupFullImage.open(name, link);
    },
    // Функция установки лайка
    handleSetLike: (cardId) => {
      // Метод передачи лайка на сервер
      api.setLike(cardId)
        .then((result) => {
          card.updateLike(result);
        })
        .then(() => {
          card.toggleLike();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    },
    // Функция удаления лайка
    handleDeleteLike: (cardId) => {
      // Метод удаления лайка с сервера
      api.delLike(cardId)
        .then((result) => {
          card.updateLike(result);
        })
        .then(() => {
          card.toggleLike();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    },
    // Функция удаления карточки
    handleDeleteClick: (cardId) => {
      popupDeleteForm.open(() => {
        // Метод удаления карточки с сервера
        api.delCard(cardId)
          .then(() => {
            card.deleteCard();
            popupDeleteForm.close();
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      });
    }
  });

  return card.createCard();
}

// Создаём экземпляры классов для работы с модальными окнами
const userInfo = new UserInfo({ nameSelector: profileName, jobSelector: profileJob, avatarSelector: profileAvatar });
const popupEditForm = new PopupWithForm(popupEdit, handleEditFormSubmit);
const popupAddForm = new PopupWithForm(popupAdd, handleAddFormSubmit);
const popupAvatarForm = new PopupWithForm(popupAvatar, handleAvatarFormSubmit);
const popupFullImage = new PopupWithImage(popupCard);
const popupDeleteForm = new PopupWithDeleteBtn(popupDelete);

// Функция редактирования профиля
function handleEditFormSubmit() {
  // Метод отправки данных о пользователе на сервер
  popupEditForm.renderLoading(true);
  api.setUserInfo(nameInput.value, jobInput.value)
    .then((result) => {
      userInfo.setUserInfo(result.name, result.about, result.avatar, result._id);
      popupEditForm.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupEditForm.renderLoading(false);
    })
}

// Функция добавления карточки
function handleAddFormSubmit() {
  // Метод отправки карточки на сервер
  popupAddForm.renderLoading(true);
  api.createCard(placeInput.value, linkInput.value)
    .then((result) => {
      cardSection.addItem(generateCard(result), 'prepend');
      popupAddForm.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupAddForm.renderLoading(false);
    })
}

// Функция обновления аватара
function handleAvatarFormSubmit() {
  popupAvatarForm.renderLoading(true);
  api.updateAvatar(avatarInput.value)
    .then((result) => {
      userInfo.setUserInfo(result.name, result.about, result.avatar, result._id);
      popupAvatarForm.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupAvatarForm.renderLoading(false);
    })
}

// Вешаем слушатель на кнопку обновления аватара
avatarButton.addEventListener('click', () => {
  formAvatarValidation.clearErrorData();
  formAvatarElement.reset();
  popupAvatarForm.open();
});

// Вешаем слушатель на кнопку редактирования профиля
editButton.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  formEditValidation.clearErrorData();
  popupEditForm.open();
});

// Вешаем слушатель на кнопку формы добавления
addButton.addEventListener('click', () => {
  formAddElement.reset();
  formAddValidation.clearErrorData();
  popupAddForm.open();
});

// Запускаем метод на закрытие попапов по иконке крестика и оверлею
popupAvatarForm.setEventListeners();
popupEditForm.setEventListeners();
popupDeleteForm.setEventListeners();
popupFullImage.setEventListeners();
popupAddForm.setEventListeners();
