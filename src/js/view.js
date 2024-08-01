export class View {
  #parentEl = document.querySelector('.todo');
  _form = document.querySelector('form');
  #work = document.querySelector('.todo--list');
  #message = 'Nothing to do! Add a task?';
  #completed = document.querySelector('.btn--done');
  _data;
  _i = 0;

  #clear() {
    this.#parentEl.innerHTML = '';
  }

  render(data) {
    const markup = this.#generateWorkMarkup(data);
    this.#parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderAll(data) {
    const markup = this.#generateAllMarkup(data);
    this.#clear();
    this.#parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  addedTodo(handler) {
    this._form.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        this._data = document.querySelector('.message').value;
        if (this._data === '') return;
        handler({
          todo: this._data,
          id: this._i++,
        });
        document.querySelector('.message').value = '';
      }.bind(this)
    );
  }
  deleteTodo(handler) {
    this.#parentEl.addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        const btn = e.target.closest('.btn--delete');
        if (!btn) return;
        handler(+btn.dataset.work);

        this.#work.innerHTML = '';
      }.bind(this)
    );
  }

  addHandlerCompleted(handler) {
    this.#parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--done');
      if (!btn) return;
      btn.closest('.todo--list').classList.add('completed');
      btn.classList.add('hidden');

      handler(true, +btn.dataset.id);
    });
  }

  addHandlerLoad(handler) {
    window.addEventListener('load', function () {
      handler();
    });
  }

  #generateWorkMarkup(data) {
    return `
      <li class="todo--list" >
        <ul class="work-container" >
          <p  class="work">${data ? data[0].todo : ''}</p>
           <button class="btn btn--done " data-id = "${
             data[0].id
           }">Done</button>
          <button class="btn btn--delete" data-work = "${
            data ? data[0].id : ''
          }">Delete</button>
        </ul>
      </li>
      `;
  }
  #generateAllMarkup(data) {
    return data
      .map(el => {
        return `
      <li class="todo--list ${el.completed ? 'completed' : ''}" >
        <ul class="work-container" >
          <p  class="work">${el.todo}</p>
           <button class="btn btn--done ${
             el.completed ? 'hidden' : ''
           }" data-id = "${el.id}"  >Done</button>
          <button class="btn btn--delete" data-work = "${el.id}">Delete</button>
        </ul>
      </li>
      `;
      })
      .join('');
  }
}

export default new View();
