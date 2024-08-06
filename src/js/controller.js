import todoView from './view/todoView.js';
import * as model from './model.js';
import monthView from './view/monthView.js';
import yearView from './view/yearView.js';

const controlAddTodo = function (data) {
  model.storeTodo(data);
  if (data.duration === 'month') todoView.render(model.state.month.slice(-1));
  if (data.duration === 'year') todoView.render(model.state.year.slice(-1));
  if(data.duration === 'today')todoView.render(model.state.message.slice(-1));
};

const controlDeleteTodo = function (id) {
  model.deleteTodo(id);
  todoView.renderAll(model.state.message.slice().reverse());
};

const controlLoadTodo = function () {
  todoView.renderAll(model.state.message.slice().reverse());
};

// This function will deal with both data's either the user completed the todo or edited it
const selectTodo = function (name, data, id) {
  const i = name.findIndex(el => el.id == id);

  return data === true ? (name[i].completed = data) : (name[i].todo = data);
};
const controlCompletedOrEditTodo = function (data, id) {
  // const i = selectTodo(model.state.message, id);

  // data === true
  //   ? (model.state.message[i].completed = data)
  //   : (model.state.message[i].todo = data);
  selectTodo(model.state.message, data, id);
  model.localStoreTodo();
};
const controlCompletedOrEditMonthTodo = function (data, id) {
  selectTodo(model.state.month, data, id);
  model.localStoreTodo();
};
const controlCompletedOrEditYearTodo = function (data, id) {
  selectTodo(model.state.year, data, id);
  model.localStoreTodo();
};

// This function deals with three the functionality first it renders all the Month Todo's and then also control the delete montly todo's functionality and if tge user reload the page it will re render all the monthly todo's
const controlMonthView = function (id) {
  id && model.deleteMonthTodo(id);
  monthView.renderAll(model.state.month.slice().reverse());
  monthView.addHandlerEdit(controlCompletedOrEditMonthTodo);
  monthView.addHandlerLoad(controlMonthView);
  monthView.addHandlerCompleted(controlCompletedOrEditMonthTodo);
};
const controlYearView = function (id) {
  id && model.deleteYearTodo(id);
  yearView.renderAll(model.state.year.slice().reverse());
  yearView.addHandlerEdit(controlCompletedOrEditYearTodo);
  yearView.addHandlerLoad(controlYearView);
  yearView.addHandlerCompleted(controlCompletedOrEditYearTodo);
};

const init = function () {
  todoView.addedTodo(controlAddTodo);
  todoView.deleteTodo(controlDeleteTodo);
  todoView.addHandlerCompleted(controlCompletedOrEditTodo);
  todoView.addHandlerEdit(controlCompletedOrEditTodo);
  todoView.addHandlerLoad(controlLoadTodo);
  monthView.addHandlerMonth(controlMonthView);
  yearView.addHandlerYear(controlYearView);
};

init();
