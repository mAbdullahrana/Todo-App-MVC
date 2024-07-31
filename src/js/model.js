export const state = {
  message: [],
};

export const storingData = function (data) {
  state.message.push(data);
  storeTodo();
};

export const deleteData = function (id) {
  state.message.splice(
    state.message.findIndex((el) => el.id === id),
    1
  );
  storeTodo();
};

const storeTodo = function () {
  localStorage.setItem("todos", JSON.stringify(state.message));
};

const init = function () {
  const storage = localStorage.getItem("todos");
  if (storage) state.message = JSON.parse(storage);
};

const clearTodos = function () {
  localStorage.clear("todos");
};
clearTodos();
// init();
