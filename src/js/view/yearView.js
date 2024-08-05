import View from './View.js';

class YearView extends View {
  _parentEl = document.querySelector('.main-content');
  _month = document.querySelector('.btn--year');
  _hash = '#year';
  _edit = '.year'

  // constructor() {
  //   super();
  //   this.addHandlerEdit();
  // }
  deleteYearTodo(handler) {
    document.querySelector('.todo-container').addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        const btn = e.target.closest('.btn--delete');
        if (!btn) return;
        btn.closest('.year').innerHTML = '';
        handler(+btn.dataset.work);
      }.bind(this)
    );
  }

  addHandlerYear(handler) {
    document.querySelector('.btn--year').addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        window.location.hash = 'year';
        // document.querySelector('.main-content').innerHTML = '';
        this._clear();
        handler();
        const heading = (document.querySelector(
          '.primary-heading'
        ).textContent = 'Yearly Todo List');

        this.deleteYearTodo(handler);
      }.bind(this)
    );
  }
}

export default new YearView();
