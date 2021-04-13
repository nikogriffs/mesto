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

let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');

// Находим кнопки "Редактировать" и "Закрыть"
let editButton = profile.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-button');

// Находим поля "Имя" и "О себе"
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

// Находим форму
let formElement = popup.querySelector('.popup__form');

// Находим поля формы
let nameInput = formElement.querySelector('.popup__input_title_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__input_title_job'); // Воспользуйтесь инструментом .querySelector()

// Функция для открытия редактирования
function clickEditButton() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

// Функция для закрытия
function clickCloseButton() {
    popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    clickCloseButton();
}

//Слушатели клика по кнопке для открытия и закрытия окна редактирования
editButton.addEventListener('click', clickEditButton);
closeButton.addEventListener('click', clickCloseButton);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
