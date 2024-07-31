export class View {
  #parentEl = document.querySelector(".todo");
  _form = document.querySelector("form");
  #work = document.querySelector(".todo--list");
  // #done = document.querySelector('.select-work')
  #message = "Nothing to do! Add a task?";
  _data;
  _i = 0;

  constructor() {
    this.addHandlerChecked();
  }

  #clear() {
    this.#parentEl.innerHTML = "";
  }

  render(data) {
    const markup = this.#generateWorkMarkup(data);
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  renderAll(data) {
    const markup = this.#generateAllMarkup(data);
    this.#clear();
    this.#parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  addedTodo(handler) {
    this._form.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
        this._data = document.querySelector(".message").value;
        if (this._data === "") return;
        handler({
          todo: this._data,
          id: this._i++,
        });
        document.querySelector(".message").value = "";
      }.bind(this)
    );
  }
  deleteTodo(handler) {
    this.#parentEl.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        const btn = e.target.closest(".btn--delete");
        if (!btn) return;
        handler(+btn.dataset.work);

        this.#work.innerHTML = "";
      }.bind(this)
    );
  }

  addHandlerChecked() {
    this.#parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".select-work");
      if (!btn) return;
console.log(btn);
    console.log(btn.value) 
    });
  }

  addHandlerLoad(handler) {
    window.addEventListener("load", function () {
      handler();
    });
  }

  #generateWorkMarkup(data) {
    return `
      <li class="todo--list">
        <ul class="work-container">
         <input class="select-work" type="checkbox">
          <p  class="work">${data ? data[0].todo : ""}</p>
          <button class="btn btn--delete" data-work = "${
            data ? data[0].id : ""
          }">Delete</button>
        </ul>
      </li>
      `;
  }
  #generateAllMarkup(data) {
    return data
      .map((el) => {
        return `
      <li class="todo--list">
        <ul class="work-container">
          <input class="select-work" type="checkbox">
          <p  class="work">${el.todo}</p>
          <button class="btn btn--delete" data-work = "${el.id}">Delete</button>
        </ul>
      </li>
      `;
      })
      .join("");
  }
}

export default new View();
