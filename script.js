/*
 * Title: To Do Application using vanilla JS DOM
 * Description: This JS file has all the JS functions necessary to control the to do application
 * Author: Sumit Saha ( Learn with Sumit )
 * Practiced by: Ryan Riaz
 * Date: 01.04.2021
 *
 */

// select elements & assign them to variables
let newTask = document.querySelector("#new-task");
let form = document.querySelector("form");
let todoUl = document.querySelector("#items");
let completeUl = document.querySelector(".complete-list ul");

// functions

// create a list item with input checkbox and label and return itself
let createTask = function (task) {
    let listItem = document.createElement("li");
    let checkbox = document.createElement("input");
    let label = document.createElement("label");

    checkbox.type = "checkbox";
    label.textContent = task;

    listItem.appendChild(checkbox);
    listItem.appendChild(label);

    return listItem;
};

// if input box a has value it adds the value to the list
let addTask = function (e) {
    e.preventDefault();
    let listItem;
    if (newTask.value !== "") {
        listItem = createTask(newTask.value);
        todoUl.appendChild(listItem);
        newTask.value = "";
    }

    // bind a function to incomplete items/tasks
    bindInCompleteItems(listItem, completeTask);
};

let completeTask = function () {
    let listItem = this.parentNode;
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";
    listItem.appendChild(deleteBtn);

    let checkbox = listItem.querySelector('input[type = "checkbox"]');
    checkbox.remove();

    completeUl.appendChild(listItem);

    // bind a function to complete items/tasks
    bindCompleteItems(listItem, deleteTask);
};

// delete the task from ul
let deleteTask = function () {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
};

let bindInCompleteItems = function (taskItem, checkboxClick) {
    let checkbox = taskItem.querySelector('input[type = "checkbox"]');
    checkbox.onchange = checkboxClick;
};

let bindCompleteItems = function (taskItem, deleteBtnClick) {
    let deleteBtn = taskItem.querySelector(".delete");
    deleteBtn.onclick = deleteBtnClick;
};

// select all the items that has already in html & works for our function
for (let i = 0; i < todoUl.children.length; i++) {
    bindInCompleteItems(todoUl.children[i], completeTask);
}

for (let i = 0; i < completeUl.children.length; i++) {
    bindCompleteItems(completeUl.children[i], deleteTask);
}

// form submision
form.addEventListener("submit", addTask);
