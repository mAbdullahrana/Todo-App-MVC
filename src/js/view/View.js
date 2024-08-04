export default class View {
  _parentEl;
  _data;
  _work = document.querySelector('.todo--list');
  _clear() {
    this._parentEl.innerHTML = '';
  }

  render(data) {
    // this._clear();
    const markup = this._generateMarkup(data);
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderAll(data) {
    const markup = this._generateMarkup(data);
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  

  _generateMarkup(data) {
    return data
      .map((el, _, arr) => {
        return `
      <li class="todo--list ${el.completed ? 'completed' : ''}" >
        <ul class="work-container" >
          <p  class="work">${arr.length === 1 ? arr[0].todo : el.todo}</p>
          <button class="btn btn--edit ${
            el.completed ? 'hidden' : ''
          } " data-id = "${arr.length === 1 ? arr[0].id : el.id}">Edit</button>
           <button class="btn btn--done ${
             el.completed ? 'hidden' : ''
           } " data-id = "${arr.length === 1 ? arr[0].id : el.id}">Done</button>
          <button class="btn btn--delete" data-work = "${
            arr.length === 1 ? arr[0].id : el.id
          }">Delete</button>
        </ul>
      </li>
      `;
      })
      .join('');
  }
}