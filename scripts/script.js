const cards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Находим необходимые элементы для дальнейшей работы в ДОМ
const profile = document.querySelector('.profile');
const popupEdit = document.querySelector('.popup__edit');
const popupAdd = document.querySelector('.popup__add');
const popupCard = document.querySelector('.popup__card');
const popupImageCard = popupCard.querySelector('.popup__image');
const popupCaptionCard = popupCard.querySelector('.popup__caption');
const places = document.querySelector('.places__list');
const template = places.querySelector('.places__card-template').content;

// Находим кнопки "Добавления", "Редактирования", "Закрытия"
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const closeEditButton = popupEdit.querySelector('.popup__close-button');
const closeAddButton = popupAdd.querySelector('.popup__close-button');
const closeImageCard = popupImageCard.querySelector('.popup__close-button');

// Находим поля "Имя" и "О себе" на сайте
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

// Находим формы
const formEditElement = popupEdit.querySelector('.popup__form');
const formAddElement = popupAdd.querySelector('.popup__form');

// Находим поля форм "Имя", "О себе", "Название", "Ссылка на картинку"
const nameInput = formEditElement.querySelector('.popup__input_title_name');
const jobInput = formEditElement.querySelector('.popup__input_title_job');
const placeInput = formAddElement.querySelector('.popup__input_title_place');
const linkInput = formAddElement.querySelector('.popup__input_title_link');

// Универсальные функции открытия и закрытия попапа
function popupOpened(popup) {
    popup.classList.add('popup_opened');
}

function popupClosed(popup) {
    popup.classList.remove('popup_opened');
}

// Функция создания первоначальных карточек из готового массива и заготовки (template)
function createCard(card) {
    const cardTemplate = template.querySelector('.places__card').cloneNode(true);
    cardTemplate.querySelector('.places__title').textContent = card.name;
    cardTemplate.querySelector('.places__image').src = card.link;
    cardTemplate.querySelector('.places__image').alt = card.name;
    // Вешаем слушателей на элементы карточек из массива
    cardTemplate.querySelector('.places__like-button').addEventListener('click', clickLikeButton);
    cardTemplate.querySelector('.places__trash-button').addEventListener('click', clickTrashButton);
    cardTemplate.querySelector('.places__image').addEventListener('click', clickImage);
    return cardTemplate;
}

// Исполнение функции для массива с карточками
cards.forEach(function(evt) {
    places.append(createCard(evt));
});

// Функция попапа при клике на картинку
function clickImage(evt) {
    popupCaptionCard.textContent = evt.target.alt;
    popupImageCard.src = evt.target.src;
    popupImageCard.alt = evt.target.alt;
    popupOpened(popupCard);
}

// Функция для закрытия попапа изображения
function clickCloseCard() {
    popupClosed(popupCard);
}

// Функция для отметки лайков или снятия
function clickLikeButton(evt) {
    evt.target.classList.toggle('places__like-button_active');
}

// Функция для удаления карточки
function clickTrashButton(evt) {
    evt.target.closest('.places__card').remove();
}

// Функция для открытия формы редактирования информации о себе
function clickEditButton() {
    popupOpened(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

// Функция для закрытия формы редактирования
function clickCloseEditButton() {
    popupClosed(popupEdit);
}

// Функция для открытия формы добавления карточек
function clickAddButton() {
    popupOpened(popupAdd);
}

// Функция для закрытия формы добавления
function clickCloseAddButton() {
    popupClosed(popupAdd);
}

// Обработчик «отправки» формы в окне редактирования
function formEditSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    clickCloseEditButton();
}

// Обработчик «отправки» формы в окне добавления (функция добавление новых карточек)
function formAddSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
    const cardTemplate = template.querySelector('.places__card').cloneNode(true);
    cardTemplate.querySelector('.places__title').textContent = placeInput.value;
    cardTemplate.querySelector('.places__image').src = linkInput.value;
    cardTemplate.querySelector('.places__image').alt = placeInput.value;
    // Вешаем слушателей для новых карточек
    cardTemplate.querySelector('.places__like-button').addEventListener('click', clickLikeButton);
    cardTemplate.querySelector('.places__trash-button').addEventListener('click', clickTrashButton);
    cardTemplate.querySelector('.places__image').addEventListener('click', clickImage);
    places.prepend(cardTemplate);
    clickCloseAddButton();
}

//Слушатели клика по кнопке для открытия и закрытия попапов
editButton.addEventListener('click', clickEditButton);
addButton.addEventListener('click', clickAddButton);
closeEditButton.addEventListener('click', clickCloseEditButton);
closeAddButton.addEventListener('click', clickCloseAddButton);
popupCard.addEventListener('click', clickCloseCard);
// Прикрепляем обработчик к формам:
// он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener('submit', formEditSubmitHandler);
formAddElement.addEventListener('submit', formAddSubmitHandler);
