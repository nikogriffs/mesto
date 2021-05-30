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

// Рендерим начальные карточки с сервера
api.getInitialCards()
  .then((result) => {
    const defaultCardList = new Section({
      items: result,
      renderer: (item) => {
        defaultCardList.addItem(generateCard(item));
      }
    }, places)
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

// Метод получения информации о пользователе с сервера
api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result.name, result.about, result.avatar, result._id);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

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
      places.prepend(generateCard(result));
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
