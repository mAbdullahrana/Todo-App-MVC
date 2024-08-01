import view from './view.js';
import * as model from './model.js';

const controlAddTodo = function (data) {
  model.storingData(data);
  view.render(model.state.message.slice(-1));
};
const controlDeleteTodo = function (id) {
  model.deleteData(id);
  view.renderAll(model.state.message.slice().reverse());
};
const controlLoadTodo = function () {
  view.renderAll(model.state.message.slice().reverse());
};

const controlCompletedTodo = function (data, id) {
  const i = model.state.message.findIndex(el => el.id == id);
  model.state.message[i].completed = data;
  model.storeTodo();
};

const init = function () {
  view.addedTodo(controlAddTodo);
  view.deleteTodo(controlDeleteTodo);
  view.addHandlerLoad(controlLoadTodo);
  view.addHandlerCompleted(controlCompletedTodo);
};

init();
