//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event){
    //Prevent form button from submitting
    event.preventDefault();
    
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add todo to localstorage
    saveLocalTodos(todoInput.value);

    //Checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //Clear TodoInput value
    todoInput.value = '';
}

function deleteCheck(event){
    //How to check what element you are clicking on:
    //console.log(event.target);

    const item = event.target;

    //Delete Todo
    if(item.classList[0] === 'trash-btn'){
        const parentItem = item.parentElement;
        //Animation
        parentItem.classList.add('fall');
        removeLocalTodos(parentItem);
        parentItem.addEventListener('transitionend', function(){
            parentItem.remove();
        });
    }

    //Check mark
    if(item.classList[0] === 'complete-btn'){
        const parentItem = item.parentElement;
        parentItem.classList.toggle("completed");
    }
}

function filterTodo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(parentItem, index){
        if (index === 0){
            return console.log('Skipped'); //Take car of annoying bug
        }
        switch(event.target.value){
            case "all":
                parentItem.style.display = "flex";
                break;
            case "completed":
                if(parentItem.classList.contains('completed')){
                    parentItem.style.display = 'flex';
                } else{
                    parentItem.style.display = 'none';
                }
                break;
            case "incompleted":
                if(!parentItem.classList.contains('completed')){
                    parentItem.style.display = 'flex';
                } else{
                    parentItem.style.display = 'none';
                }
                break;
        }
    });
    
}

function saveLocalTodos(todo){
    //Check for anything already in storage
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    //Check for anything already in storage
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //Todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Checkmark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class = "fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);
    });

}

function removeLocalTodos(todo){
    //Check for anything already in storage
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}