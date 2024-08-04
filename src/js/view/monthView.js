import View from './View.js';

class MonthView extends View {
  _parentEl = document.querySelector('.main-content');
  _month = document.querySelector('.btn--month');
  _work = document.querySelector('.todo--list');

  // constructor(){
  //   super()
  //   this.addHandlerMonth()
  // }

  deleteMonthTodo(handler) {
    document.querySelector('.todo-container').addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        const btn = e.target.closest('.btn--delete');
        if (!btn) return;
        btn.closest('.todo--list').innerHTML = '';
        handler(+btn.dataset.work);
      }.bind(this)
    );
  }

  addHandlerMonth(handler) {
    this._month.addEventListener(
      'click',
      function (e) {
        e.preventDefault();
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
