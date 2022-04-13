const todoTextInput = document.querySelector('#new-todo-text');
const clearInput = document.querySelector('.check-mark .clear-input');
const todoItems = document.querySelector('.todo-items');
// const deleteItems = document.querySelectorAll('.delete-wrapper .delete-item')

//firbase variables
const dbCollection = db.collection('todos');

//get todo items from DB
getTodoFromDB();

//add item to todo list
function addItem(event) {
    event.preventDefault();
    addTodoToDB(todoTextInput);
}

const addTodoToDB = (todoText) => {
    dbCollection.add({
        text: todoText.value,
        status: 'active',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }).catch((error) => {
        console.log(`error adding todo: ${error}`);
    });

    todoText.value = ''; // clear text field after saving into db
}

function getTodoFromDB() {
    dbCollection.orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
            let itemsList = [];

            snapshot.docs.forEach((doc) => {
                itemsList.push(
                    {
                        id: doc.id, //get each document id
                        ...doc.data(), //spread all data in a map
                    }

                );
            });

            //generate items from itemsList
            generateTodoItem(itemsList);

        });
}

function generateTodoItem(todoItemsList) {
    let todoItemHTML = '';

    //check todoItemsList if it is empty 
    if (!todoItemsList.length || todoItemsList.length === 0) {
        todoItemHTML +=
            `
            <div class="empty-todo">
                <img class="clear-input" src="./assets/images/empty-todo.svg" alt="empty-todo-list">
                <h4>Create A New Todo And Let's Get It Completed!!!</h4>
            </div>
        `;
    }

    //loop through todo items list gotten from db
    todoItemsList.forEach((todoItem) => {

        todoItemHTML +=
            `
            <div class="todo-item">
                <!-- check icon and text -->
                <div class="check-text-wrapper">
                    <div class="check">
                        <div data-id = "${todoItem.id}" class="check-mark">
                            <img src="./assets/images/icon-check.svg" alt="check-mark-img">
                        </div>
                    </div>

                    <div class="todo-text-wrapper">
                        <div class="todo-text">
                            ${todoItem.text}
                        </div>
                    </div>
                </div>

                <!-- delete button -->
                <div class="delete-wrapper">
                    <img data-id = "${todoItem.id}" class="delete-item" src="./assets/images/icon-delete.svg" alt="delete-img">
                </div>
            </div>
        `;
    });


    //grab the todoItems innerHTML and injecct each todoItem into item
    todoItems.innerHTML = todoItemHTML;

    deleteTodoItem();

}

//delete single todo item
function deleteTodoItem() {
    const deleteItems = document.querySelectorAll('.delete-item') //query all [.delete-item] 
    deleteItems.forEach(deleteItem => { //loop through each [.delete-item]
        deleteItem.addEventListener('click', function () {
            dbCollection.doc(deleteItem.dataset.id).delete(); //grab doc id from html [data-id] attribute of [.delete-item]
        })
    });
}



//clear todo input
clearInput.addEventListener('click', function () {
    todoTextInput.value = "";
});




