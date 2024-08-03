export const state = {
  message: [],
  month: [],
  year: [],
};

export const storeTodo = function (data) {
   if(data.duration === 'month')state.month.push(data) 
   else if (data.duration === 'year') state.year.push(data) 
   else state.message.push(data) 
  localStoreTodo();
  console.log(state.message);
  console.log(state.year);
  console.log(state.month);
};

export const deleteTodo = function (id) {
  state.message.splice(
    state.message.findIndex(el => el.id === id),
    1
  );
  localStoreTodo();
};

export const localStoreTodo = function () {
  localStorage.setItem('todos', JSON.stringify(state.message));
};

const init = function () {
  const storage = localStorage.getItem('todos');
  if (storage) state.message = JSON.parse(storage);
};

const clearTodos = function () {
  localStorage.clear('todos');
};
// clearTodos();
init();
