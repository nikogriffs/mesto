import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Api } from '../components/Api.js';
import {
  places, editButton, addButton, formEditElement, formAddElement,
  nameInput, jobInput, placeInput, linkInput, configValidation, avatarInput,
  popupEdit, popupAdd, popupCard, profileName, profileJob, profileAvatar, popupDelete, avatarButton, popupAvatar, formAvatarElement
} from '../utils/constants.js';
import { PopupWithDeleteBtn } from '../components/PopupWithDeleteBtn';
const saveButton = document.querySelector('.places__save-button');

let defaultCardList = null;

// Экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: '8e28ef26-30e7-43b7-b459-31efb2dce5c1',
    'Content-Type': 'application/json'
  }
});

// Рендерим начальные карточки с сервера
api.getInitialCards()
  .then((result) => {
    defaultCardList = new Section({
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

  const myId = userInfo.getUserInfo().id;
  const card = new Card(data, myId, '#card-template', {

    handleCardClick: (name, link) => {
      popupFullImage.open(name, link);
    },

    handleLikeClick: (evt, places) => {
      const buttonLike = places.querySelector('.places__like-button');
      const counterLike = places.querySelector('.places__like-counter');
      if (!buttonLike.classList.contains('places__like-button_active')) {
        api.setLike(evt)
          .then((result) => {
            console.log(result);
            counterLike.textContent = result.likes.length;
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      } else {
        api.delLike(evt)
          .then((result) => {
            console.log(result);
            counterLike.textContent = result.likes.length;
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      }
    },

    handleDeleteClick: (cardId) => {
      popupDeleteForm.open(cardId, () => {

        api.delCard(cardId)
          .then(card.deleteCard())
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
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupEditForm.renderLoading(false);
    })

  popupEditForm.close();
}

// Функция добавления карточки
function handleAddFormSubmit() {
  popupAddForm.renderLoading(true);
  api.createCard(placeInput.value, linkInput.value)
    .then((result) => {
      places.prepend(generateCard(result));
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupAddForm.renderLoading(false);
    })
  popupAddForm.close();
}

function handleAvatarFormSubmit() {
  popupAvatarForm.renderLoading(true);
  api.updateAvatar(avatarInput.value)
    .then((result) => {
      console.log(result.avatar);
      userInfo.setUserInfo(result.name, result.about, result.avatar, result._id);

    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupAvatarForm.renderLoading(false);
    })
  formAvatarElement.reset();
  formAvatarValidation.clearErrorData();
  popupAvatarForm.close();
}

avatarButton.addEventListener('click', () => {
  // nameInput.value = userInfo.getUserInfo().name;
  // jobInput.value = userInfo.getUserInfo().job;
  // formEditValidation.clearErrorData();
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




// form.addEventListener('submit', function submit(e) {
//   e.preventDefault();
//   renderLoading(true);
//   search(form.elements.entity.value, form.elements.entityId.value)
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(res.status);
//     })
//     .then((res) => {
//       console.log(res);
//       renderResult(res.name);
//     })
//     .catch((err) => {
//       console.log(`Ошибка: ${err}`);
//       renderError(`Ошибка: ${err}`);
//     })
//     .finally(() => {
//       renderLoading(false);
//     });
// });


// function renderLoading(isLoading, isLoadText, isPreloadText) {
//   if (isLoading) {
//     saveButton.textContent = isLoadText;
//   } else {
//     saveButton.textContent = isPreloadText;
//   }
// }
