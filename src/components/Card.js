export class Card {
  constructor(data, myId, cardSelector, { handleCardClick, handleSetLike, handleDeleteLike, handleDeleteClick }) {
    this._cardSelector = cardSelector;
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._owner = data.owner._id;

    this._myId = myId;

    this._clickImage = handleCardClick;
    this._setLike = handleSetLike;
    this._clickDelete = handleDeleteClick;
    this._deleteLike = handleDeleteLike;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.places__card').cloneNode(true);
    return cardElement;
  }

  // Метод создания первоначальных карточек из готового массива и заготовки (template)
  createCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.places__like-button');
    this._counterLike = this._element.querySelector('.places__like-counter');
    this._cardImage = this._element.querySelector('.places__image');
    this._deleteButton = this._element.querySelector('.places__trash-button');

    this._element.querySelector('.places__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    // Вешаем слушателей на элементы карточек из массива
    this._buttonLike.addEventListener('click', () => {
      // Либо метод установки лайка, либо метод удаления лайка
      if (this._buttonLike.classList.contains('places__like-button_active')) {
        this._deleteLike(this._cardId);
      } else {
        this._setLike(this._cardId);
      }
    });

    this._deleteButton.addEventListener('click', () => {
      this._clickDelete(this._cardId);
    });

    this._cardImage.addEventListener('click', () => {
      this._clickImage(this._name, this._link);
    });

    // Запускаем методы на проверку моих лайков, проверку моих карточек и обновляем лайки с сервера
    this.updateLike(this._data);
    this._checkMyCard();
    this._checkMyLikes();
    return this._element;
  }

  // Метод отрисовки лайка
  toggleLike() {
    this._buttonLike.classList.toggle('places__like-button_active');
  }

  // Если лайк уже стоит, помечаем его
  _checkMyLikes() {
    this._likes.forEach(likes => {
      if (likes._id === this._myId) {
        this._buttonLike.classList.add('places__like-button_active');
      }
    });
  }

  // Если карточка не моя, иконка корзины исчезает
  _checkMyCard() {
    if (this._myId !== this._owner) {
      this._deleteButton.style.display = 'none';
    }
  }

  // Метод обновления лайков
  updateLike(data) {
    this._counterLike.textContent = data.likes.length;
  }

  // Метод для удаления карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
