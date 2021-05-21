export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Метод отрисовки карточки
  addItem(element) {
    this._container.prepend(element);
  }

  // Метод отрисовки всех элементов
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
