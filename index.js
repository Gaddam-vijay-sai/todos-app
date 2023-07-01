let todoItemsContainer = document.getElementById("todoItemsContainer");

function getTodoListFromLocalStorage() {
    let stringifiedTodolist = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodolist);

    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
let saveButton = document.getElementById("saveButton");

function createAndAppendTodo(todo) {

    let checkboxId = "checkbox" + todo.uniqueNum;
    let todoId = "todo" + todo.uniqueNum;


    let todoItemContainter = document.createElement("li");
    todoItemContainter.classList.add("d-flex", "flex-row", "todo-item-container");
    todoItemContainter.id = todoId;
    todoItemsContainer.appendChild(todoItemContainter);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    todoItemContainter.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");
    todoItemContainter.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    if (todo.isChecked) {
        labelElement.classList.add("checked");
    }

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);


    deleteIcon.onclick = function() {
        todoItemsContainer.removeChild(todoItemContainter);
        let deletedIndex = todoList.findIndex(function(todoObj) {
            let id = "todo" + todoObj.uniqueNo;
            if (id === todoItemContainter.id) return true;
            else return false;
        });

        todoList.splice(deletedIndex, 1);
    };

    inputElement.onclick = function() {
        labelElement.classList.toggle('checked');

        let index = todoList.findIndex(function(eachObj) {
            let id = "checkbox" + eachObj.uniqueNum;
            if (id === inputElement.id) return true;
            return false;
        });

        if (todoList[index].isChecked) todoList[index].isChecked = false;
        else todoList[index].isChecked = true;
    };
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

let len = todoList.length;

let addButton = document.getElementById("addButton");
addButton.onclick = function() {
    if (document.getElementById("todoUserInput").value === "") {
        alert("Enter a valid input");
        return;
    }
    let newTodoObject = {};
    newTodoObject.text = document.getElementById("todoUserInput").value;
    len++;
    newTodoObject.uniqueNum = len;
    createAndAppendTodo(newTodoObject);

    todoList.push(newTodoObject);

    document.getElementById("todoUserInput").value = "";
};

document.getElementById("todoUserInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        if (document.getElementById("todoUserInput").value === "") {
            alert("Enter a valid input");
            return;
        }
        let newTodoObject = {};
        newTodoObject.text = document.getElementById("todoUserInput").value;
        len++;
        newTodoObject.uniqueNum = len;
        createAndAppendTodo(newTodoObject);

        todoList.push(newTodoObject);

        document.getElementById("todoUserInput").value = "";
    }
});


saveButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};
