import todoView from './view/todoView.js';
import * as model from './model.js';
import monthView from './view/monthView.js';

const controlAddTodo = function (data) {
  model.storeTodo(data);
  if (data.duration === 'month') todoView.render(model.state.month.slice(-1));
  else if (data.duration === 'year')
    todoView.render(model.state.year.slice(-1));
  else todoView.render(model.state.message.slice(-1));
};

const controlDeleteTodo = function (id) {
  model.deleteTodo(id);
  todoView.renderAll(model.state.message.slice().reverse());
};
const controlDeleteMonthTodo = function (id) {
  console.log(id);
  model.deleteTodo(id);
  monthView.renderAll(model.state.month.slice().reverse());
};
const controlLoadTodo = function () {
  // todoView.renderAll(model.state.message.slice().reverse());
  // todoView.renderAll(model.state.month.slice().reverse());
  monthView.render(model.state.month.slice().reverse());
};

// This function will deal with both data's either the user completed the todo or edited it

const controlCompletedOrEditTodo = function (data, id) {
  const i = model.state.message.findIndex(el => el.id == id);

  data === true
    ? (model.state.message[i].completed = data)
    : (model.state.message[i].todo = data);
  model.localStoreTodo();
};

// This function deals with both the functionality first it renders all the Month Todo's and then also control the delete montly todo's functionality
const controlMonthView = function (id) {
  id && model.deleteMonthTodo(id)
  monthView.renderAll(model.state.month.slice().reverse());

};

const init = function () {
  todoView.addedTodo(controlAddTodo);
  todoView.deleteTodo(controlDeleteTodo);
  todoView.addHandlerLoad(controlLoadTodo);
  todoView.addHandlerCompleted(controlCompletedOrEditTodo);
  todoView.addHandlerEdit(controlCompletedOrEditTodo);
  monthView.addHandlerMonth(controlMonthView);
  // monthView.deleteMonthTodo(controlDeleteMonthTodo)
};

init();
