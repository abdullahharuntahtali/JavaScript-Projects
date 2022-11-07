//Tüm Elementleri Seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
  // Bu fonksiyon tüm event listenerler için
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}
function loadAllTodosUI() {
  let todos = getTodosFromStorage();
  todos.forEach((list) => {
    addTodoUI(list);
  });
}
function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");
  listItems.forEach((listItem) => {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      //Bulamadı
      listItem.setAttribute("style", "display:none !important");
    } else {
      listItem.setAttribute("style", "display:block");
    }
  });
}
function addTodo(e) {
  const newTodo = todoInput.value.trim();
  if (newTodo === "") {
    type = "danger";
    message = "Lütfen bir todo giriniz...";
    showAlert(type, message);
  } else {
    addTodoUI(newTodo);
    addTodoStorage(newTodo);
    showAlert("success", "Todo başarıyla eklendi");
  }

  e.preventDefault();
}
function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
  }
}
function deleteTodoFromStorage(todo) {
  let todos = getTodosFromStorage();

  todos.forEach((e, index) => {
    if (todo === e) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);

  //setTimeout
  setTimeout(() => {
    alert.remove();
  }, 3000);
}
function addTodoUI(newTodo) {
  /*
<li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>
*/
  //List Item Oluşturma
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex justify-content-between";
  //Link Oluşturma
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  //TextNode Ekleme
  listItem.appendChild(document.createTextNode(newTodo));

  listItem.appendChild(link);

  //Todo Liste List Itemi Ekleme
  todoList.appendChild(listItem);
  todoInput.value = "";
} //String değerini list item olarak UI ya ekleyecek.

function getTodosFromStorage() {
  //Storageden bütün todoları alır
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
function addTodoStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function clearAllTodos() {
  if (confirm("Tümünü Silmek İztediğinize Emin misiniz?")) {
    //Arayüzden todoları kaldıralım
    // todoList.innerHTML = ""; //Yavaş bir yöntem
    while (todoList.firstElementChild != null) {
      todoList.firstElementChild.remove();
    }
    localStorage.removeItem("todos");
  }
}
