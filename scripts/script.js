const initialCards = [{
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

const profile = document.querySelector('.profile');
const popupEdit = document.querySelector('.popup__edit');
const popupAdd = document.querySelector('.popup__add');

// Находим кнопки "Редактировать" и "Закрыть"
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const closeEditButton = popupEdit.querySelector('.popup__close-button');
const closeAddButton = popupAdd.querySelector('.popup__close-button');

// Находим поля "Имя" и "О себе"
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

// Находим форму
const formEditElement = popupEdit.querySelector('.popup__form');
const formAddElement = popupAdd.querySelector('.popup__form');

// Находим поля формы
const nameInput = formEditElement.querySelector('.popup__input_title_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = formEditElement.querySelector('.popup__input_title_job'); // Воспользуйтесь инструментом .querySelector()
const placeInput = formAddElement.querySelector('.popup__input_title_place');
const linkInput = formAddElement.querySelector('.popup__input_title_link');

// Функция для открытия редактирования
function clickEditButton() {
    popupEdit.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function clickAddButton() {
    popupAdd.classList.add('popup_opened');
}

// Функция для закрытия
function clickCloseEditButton() {
    popupEdit.classList.remove('popup_opened');
}

function clickCloseAddButton() {
    popupAdd.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formEditSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    clickCloseEditButton();
}

function formAddSubmitHandler(evt) {
    evt.preventDefault();

    clickCloseAddButton();
}




//Слушатели клика по кнопке для открытия и закрытия окна редактирования
editButton.addEventListener('click', clickEditButton);
addButton.addEventListener('click', clickAddButton);
closeEditButton.addEventListener('click', clickCloseEditButton);
closeAddButton.addEventListener('click', clickCloseAddButton);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditElement.addEventListener('submit', formEditSubmitHandler);
formAddElement.addEventListener('submit', formAddSubmitHandler);
