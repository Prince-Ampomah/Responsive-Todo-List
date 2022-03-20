const todoText = document.querySelector('#new-todo-text');

function addItem(event) {
    event.preventDefault();
    console.log(todoText.value);
}