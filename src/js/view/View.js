export default class View {
  _parentEl;
  _data;
  _work = document.querySelector('.todo--list');
  _hash;
  // _edit = '.today'
  // _btn = e.target.closest('.btn--edit');
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

  addHandlerCompleted(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--done');
      if (!btn) return;
      btn.closest('.todo--list').classList.add('completed');
      btn.classList.add('hidden');
      btn
        .closest('.todo--list')
        .querySelector('.btn--edit')
        .classList.add('hidden');

      handler(true, +btn.dataset.id);
    });
  }

  addHandlerEdit(handler) {
    this._parentEl.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.btn--edit');
        if (!btn) return;
        const form = `<form >
      <input class="new-message" type="text" placeholder="Add Todo" >
      <button class="btn btn--submit edit" type="submit">SUBMIT</button>
      </form>`;
        const data = btn
          .closest('.work-container')
          .querySelector('.work').textContent;

        btn.closest(this._edit).insertAdjacentHTML('afterbegin', form);

        btn.closest('.work-container').classList.add('hidden');

        document.querySelector('.new-message').value = data;

        document.querySelector('.edit').addEventListener('click', function (e) {
          const edit = e.target
            .closest('form')
            .querySelector('.new-message').value;

          btn.closest('.work-container').querySelector('.work').textContent =
            edit;

          btn.closest('.work-container').classList.remove('hidden');

          e.target.closest('form').classList.add('hidden');

          handler(edit, +btn.dataset.id);
        });
      }.bind(this)
    );
  }

  _generateMarkup(data) {
    return data
      .map((el, _, arr) => {
        return `
      <li class="todo--list ${el.completed ? 'completed' : ''} ${
          el.duration === 'today' ? 'today' : ''
        }   ${
          el.duration === 'month' ? 'month' : ''
        }  ${
          el.duration === 'year' ? 'year' : ''
        }" >
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

  addHandlerLoad(handler) {
    window.addEventListener(
      'load',
      function (e) {
        if (window.location.hash === this._hash) handler();
      }.bind(this)
    );
  }
}
