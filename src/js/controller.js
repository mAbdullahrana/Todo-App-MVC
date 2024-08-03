import view from './view.js';
import * as model from './model.js';
import SelectView from './newView/selectView.js';

const controlAddTodo = function (data) {
  model.storeTodo(data);
  view.render(model.state.message.slice(-1));
};
const controlDeleteTodo = function (id) {
  model.deleteTodo(id);
  view.renderAll(model.state.message.slice().reverse());
};
const controlLoadTodo = function () {
  view.renderAll(model.state.message.slice().reverse());
};

// This function will deal with both data's either the user completed the todo or edited it

const controlCompletedOrEditTodo = function (data, id) {
  const i = model.state.message.findIndex(el => el.id == id);

  data === true
    ? (model.state.message[i].completed = data)
    : (model.state.message[i].todo = data);
  model.localStoreTodo();
};

const init = function () {
  view.addedTodo(controlAddTodo);
  view.deleteTodo(controlDeleteTodo);
  view.addHandlerLoad(controlLoadTodo);
  view.addHandlerCompleted(controlCompletedOrEditTodo);
  view.addHandlerEdit(controlCompletedOrEditTodo);
};

init();
