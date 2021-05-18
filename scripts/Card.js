export class Card {
  constructor(data, cardSelector, clickImage) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._clickImage = clickImage;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.places__card').cloneNode(true);

    return cardElement;
  }

  // Метод создания первоначальных карточек из готового массива и заготовки (template)
  createCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.places__image');

    this._element.querySelector('.places__title').textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    // Вешаем слушателей на элементы карточек из массива
    this._element.querySelector('.places__like-button').addEventListener('click', this._handleLikeCard);
    this._element.querySelector('.places__trash-button').addEventListener('click', () => {
      this._handleDeleteCard();
    });
    cardImage.addEventListener('click', this._clickImage);

    return this._element;
  }

  // Метод для отметки лайков или снятия
  _handleLikeCard() {
    this.classList.toggle('places__like-button_active');
  }

  // Метод для удаления карточки
  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}
