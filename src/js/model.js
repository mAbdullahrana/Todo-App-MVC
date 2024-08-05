export const state = {
  message: [],
  month: [],
  year: [],
};

export const storeTodo = function (data) {
  if (data.duration === 'month') state.month.push(data);
  else if (data.duration === 'year') state.year.push(data);
  else state.message.push(data);
  localStoreTodo();
  console.log(state.month);
};

export const deleteTodo = function (id) {
  state.message.splice(
    state.message.findIndex(el => el.id === id),
    1
  );
  localStoreTodo();
};
export const deleteMonthTodo = function (id) {
  state.month.splice(
    state.month.findIndex(el => el.id === id),
    1
  );
  localStoreTodo();
};
export const deleteYearTodo = function (id) {
  state.year.splice(
    state.year.findIndex(el => el.id === id),
    1
  );
  localStoreTodo();
};

export const localStoreTodo = function () {
  localStorage.setItem('todos', JSON.stringify(state.message));
  localStorage.setItem('monthly', JSON.stringify(state.month));
  localStorage.setItem('yearly', JSON.stringify(state.year));
};

const init = function () {
  const todayStorage = localStorage.getItem('todos');
  const montlyStorage = localStorage.getItem('monthly');
  const yearlyStorage = localStorage.getItem('yearly');
  if (todayStorage) state.message = JSON.parse(todayStorage);
  if (montlyStorage) state.month = JSON.parse(montlyStorage);
  if (yearlyStorage) state.year = JSON.parse(yearlyStorage);
};

const clearTodos = function () {
  localStorage.clear('todos');
};
// clearTodos();
init();
