import View from './View.js'

class TodoView extends View {
  _parentEl = document.querySelector('.todo');
  _form = document.querySelector('form');
  #message = 'Nothing to do! Add a task?';
  _hash = '#todo'
  _i = 1;

  constructor() {
    super()
    // this.addHandlerSelect()
    this.addHandlerFirstLoad
  }

  addHandlerFirstLoad(){
    document.addEventListener('DOMContentLoaded', function(e){
      window.location.hash = 'today'
    });
  }
  

  addedTodo(handler) {
    this._form.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        this._data = document.querySelector('.message').value;
       const time = document.querySelector('.select-todo').value;
        if (this._data === '') return;
        handler({
          todo: this._data,
          id: this._i++,
          duration : time,
        });
        document.querySelector('.message').value = '';
      }.bind(this)
    );
  }
  deleteTodo(handler) {
    this._parentEl.addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        const btn = e.target.closest('.btn--delete');
        if (!btn) return;
        handler(+btn.dataset.work);

        this._work.innerHTML = '';
      }.bind(this)
    );
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

        btn.closest('.todo--list').insertAdjacentHTML('afterbegin', form);

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

  
 
}

export default new TodoView();
