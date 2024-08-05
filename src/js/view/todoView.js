import View from './View.js'

class TodoView extends View {
  _parentEl = document.querySelector('.todo');
  _form = document.querySelector('form');
  #message = 'Nothing to do! Add a task?';
  _hash = '#todo'
  _edit = '.today'
  _i = 1;

  constructor() {
    super()
    // this.addHandlerSelect()
    this.addHandlerFirstLoad()
  }

  addHandlerFirstLoad(){
    document.addEventListener('DOMContentLoaded', function(e){
      window.location.hash = '#todo'
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

  


  
 
}

export default new TodoView();
