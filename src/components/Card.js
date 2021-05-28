export class Card {
  constructor(data, myId, cardSelector, { handleCardClick, handleLikeClick, handleDeleteClick }) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._owner = data.owner;

    this._myId = myId;

    this._clickImage = handleCardClick;
    this._clickLike = handleLikeClick;
    this._clickDelete = handleDeleteClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.places__card').cloneNode(true);
    return cardElement;
  }

  // Метод создания первоначальных карточек из готового массива и заготовки (template)
  createCard() {
    this._element = this._getTemplate();

    this._buttonLikeCard = this._element.querySelector('.places__like-button');
    this._counterLikeCard = this._element.querySelector('.places__like-counter');
    this._cardImage = this._element.querySelector('.places__image');
    this._deleteButton = this._element.querySelector('.places__trash-button');

    if (this._likes.some(likes => likes._id === this._myId)) {
      this._buttonLikeCard.classList.add('places__like-button_active')
    }

    if (!(this._myId === this._owner._id)) {
      // this._deleteButton.style.display = 'none';
      this._deleteButton.style.display = 'none';
    }

      this._element.querySelector('.places__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    // Вешаем слушателей на элементы карточек из массива
    this._element.querySelector('.places__like-button').addEventListener('click', this._handleLikeCard);

    this._element.querySelector('.places__trash-button').addEventListener('click', () => {
      this._clickDelete(this._cardId);
    });

    this._cardImage.addEventListener('click', () => {
      this._clickImage(this._name, this._link);
    });

    this._counterLikeCard.textContent = this._likes.length;
    return this._element;
  }

  // Метод для отметки лайков или снятия
  _handleLikeCard = () => {
    this._clickLike(this._cardId, this._element);
    const likeButton = this._element.querySelector('.places__like-button');
    likeButton.classList.toggle('places__like-button_active');
  }

  // Метод для удаления карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
