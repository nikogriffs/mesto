export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  // Метод отрисовки карточки
  addItem(element, location) {
    this._container[location](element);
  }

  // Метод отрисовки всех элементов
  renderItems(items) {
    this._renderedItems = items;
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
