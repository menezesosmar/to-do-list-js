// Seleção de elementos.
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;
// Funções
const saveTodo = (text) => {
  // Este é um criador de tarefas.

  // Esta é a div geral.
  const todo = document.createElement("div");
  todo.classList.add('todo');
  
  //Criação do título.
  const todoTitle = document.createElement("h3");
 // Aqui insere o texto no elemento criado.
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  console.log(todo);
  
  //Criação do botão finalizar tarefa.
  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  //Criação do botão editar tarefa.
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  //Criação do botão deletar tarefa.
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(deleteBtn);

  //Colocou o list dentro da div
  todoList.appendChild(todo);

  //Limpeza do campo de texto após o usuário criar uma tarefa.
  todoInput.value = "";
  todoInput.focus();
};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
}

const updateTodo = (text) =>{

  const todos = document.querySelectorAll(".todo");
  
  todos.forEach((todo) =>{
    
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue){
      todoTitle.innerText = text;
    }
  });
}

// Eventos
todoForm.addEventListener("submit", (e) =>{
  // Quando o usuário clicar no adicionar sem nenhum texto, nada acontece
  e.preventDefault();

  const inputValue = todoInput.value;

  //Validação para garantir que o usuário não crie tarefas sem título
  if(inputValue){
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if(parentEl && parentEl.querySelector("h3")){
    todoTitle = parentEl.querySelector("h3").innerHTML;
  }

  if(targetEl.classList.contains("finish-todo")){
    parentEl.classList.toggle("done");
  }

  if(targetEl.classList.contains("remove-todo")){
    parentEl.remove();
  }

  if(targetEl.classList.contains("edit-todo")){
    toggleForms();

    //Aqui eu mudo o valor do input.
    editInput.value = todoTitle;
    //Aqui eu mapeio o valor dele em outra variável.
    oldInputValue = todoTitle;
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  
  e.preventDefault();
  // Pegar o valor novo do input.
  const editInputValue = editInput.value;
  // Checagem para ver se está vazio para poder realizar a atualização corretamente.
  if(editInputValue){
    updateTodo(editInputValue);
  }

  toggleForms();
});