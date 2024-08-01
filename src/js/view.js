export class View {
  #parentEl = document.querySelector('.todo');
  _form = document.querySelector('form');
  #work = document.querySelector('.todo--list');
  #message = 'Nothing to do! Add a task?';
  #completed = document.querySelector('.btn--done');
  _data;
  _i = 0;

  constructor() {
    // this.addHandlerEdit();
  }

  #clear() {
    this.#parentEl.innerHTML = '';
  }

  render(data) {
    const markup = this.#generateMarkup(data);
    this.#parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderAll(data) {
    const markup = this.#generateMarkup(data);
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

  // addHandlerEdit() {
  //   this.#parentEl.addEventListener('click', function (e) {
  //     const btn = e.target.closest('.btn--edit');
  //     if (!btn) return;
  //     const form = `<form >
  //     <input class="message" type="text" placeholder="Add Todo" >
  //     <button class="btn btn--submit" type="submit">SUBMIT</button>
  //     </form>`;
  //     const data = btn.closest('.work-container').querySelector('.work').textContent;
  //     console.log(data);
  //     const markup = btn.closest('.todo--list').insertAdjacentHTML('afterbegin',form);
  //     this.#generateMarkup()
  //     // btn.closest('.work-container').innerHTML = ''
  //     document.querySelector('.message').value = data
  //   });
  // }

  addHandlerLoad(handler) {
    window.addEventListener('load', function () {
      handler();
    });
  }

  #generateMarkup(data) {
    return data
      .map((el, _, arr) => {
        return `
      <li class="todo--list ${el.completed ? 'completed' : ''}" >
        <ul class="work-container" >
          <p  class="work">${arr.length === 1 ? arr[0].todo : el.todo}</p>
          <button class="btn btn--edit " data-id = "${
            arr.length === 1 ? arr[0].id : el.id
          }">Edit</button>
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

export default new View();
