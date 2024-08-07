import View from './View.js';

class MonthView extends View {
  _parentEl = document.querySelector('.main-content');
  _month = document.querySelector('.btn--month');
  _hash = '#month';
  _edit = '.month';
  // constructor() {
  //   super();
  //   this.addHandlerEdit();
  // }
  deleteMonthTodo(handler) {
    document.querySelector('.todo-container').addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        const btn = e.target.closest('.btn--delete');
        if (!btn) return;
        btn.closest('.month').innerHTML = '';
        handler(+btn.dataset.work);
      }.bind(this)
    );
  }

  addHandlerMonth(handler) {
    document.querySelector('.btn--month').addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        window.location.hash = 'month';
        const btn = e.target.closest('.btn--month');
        // document.querySelector('.main-content').innerHTML = '';
        this._clear();
        handler();
        const heading = (document.querySelector(
          '.primary-heading'
        ).textContent = 'Monthly Todo List');

        this.deleteMonthTodo(handler);
      }.bind(this)
    );
  }
}

export default new MonthView();
