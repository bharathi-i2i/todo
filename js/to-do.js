"use strict";
init();

var tasks = [];
var listInfo = "";
var subTaskInfo = "";
var stepInfo = "";

var subTask = getElementById("sub-task");
var step = getElementById("step-name");

/**
 * Used to bind all event listeners in the initial load of the page. 
 */
function init() {
    addEventListeners(getElementById("main-menu"),"click",openMenu);
    addEventListeners(getElementById("add-task"),"click",openMenuForPlusIcon);
    addEventListeners(getElementById("new-list"),"keyup",addTask);
    addEventListeners(getElementById("enter-task"),"keyup",addSubTask);
    addEventListeners(getElementById("enter-step"),"keyup",addStep);
}

/**
 * Used to get the element by the help of the id. 
 * 
 * @param {*} id denotes the id of the element to be fetched.
 */
function getElementById(id) {
    return document.getElementById(id);
}

/**
 * Used to add event and callback the function if the event is triggered.
 * 
 * @param {*} element containing element to which event to be added.
 * @param {*} selectedEvent contains the event on which the callback has to be triggered.
 * @param {*} resultOperation the function to be called if the event is triggered.
 */
function addEventListeners(element,action,resultOperation) {
    element.addEventListener(action,resultOperation)
}

/**
 * Used to get the element by the help of the className. 
 * 
 * @param {*} className denotes the className of the element to be fetched.
 */
function getElementByClassName(className) {
    return document.getElementsByClassName(className);
}

/**
 * Used to toggle the side menu bar.
 */
function openMenu() {
    var leftMenu = getElementById("menu");
    var menuDiv = getElementById("menu-bar");
    var menuNames = getElementByClassName("left-side-menu");
    if (leftMenu.value === "closed") {
        menuDiv.setAttribute("class","menu-bar menu-bar-open");
        leftMenu.value = "opened";
        for ( var name in menuNames) {
            menuNames[name].setAttribute("class","left-side-menu menu-name-visible");
        }
    } else {
        menuDiv.setAttribute("class","menu-bar menu-bar-close");
        leftMenu.value = "closed";
        for ( var menuName in menuNames) {
            menuNames[menuName].setAttribute("class","left-side-menu menu-name-hide");
        }
    }
}

/**
 * Used to open the menu bar while click plus icon.
 */
function openMenuForPlusIcon() {
    var leftMenu = getElementById("menu");
    var menuDiv = getElementById("menu-bar");
    var menuNames = getElementByClassName("left-side-menu");
    if (leftMenu.value === "closed") {
        menuDiv.setAttribute("class","menu-bar menu-bar-open");
        leftMenu.value = "opened";
        for ( var menu in menuNames) {
            menuNames[menu].setAttribute("class","left-side-menu menu-name-visible");
        }
    }
}

/**
 * Used to add the new task if event is triggered in the new list input text box.
 * 
 * @param {*} event used to get the event keycode.
 */
function addTask(event) {
    var newListValue = getElementById("new-list");
    var taskName = getElementById("task-title");
    var taskQuery = getElementById("enter-task");
    if (event.keyCode === 13 && "" !== newListValue.value.trim()) {
        var newTask = {};
        newTask.id = generateId();
        newTask.name = newListValue.value;
        newTask.status = Boolean(true);
        newTask.subTask = [];
        tasks.push(newTask);
        addNewList(newTask);
        taskName.textContent = newTask.name;
        taskQuery.value = "";
        taskQuery.focus();
        newListValue.value="";
    }
}

/**
 * Used to add new sub task information if event is triggered by new-task input text box.
 * 
 * @param {*} event used to get the event keycode.
 */
function addSubTask(event) {
    var subTaskQuery = getElementById("enter-task");
    if (event.keyCode === 13 && "" !== subTaskQuery.value.trim()) {
        var newSubTask = {};
        newSubTask.id = generateId();
        newSubTask.name = subTaskQuery.value;
        newSubTask.status = Boolean(true);
        newSubTask.steps = [];
        listInfo.subTask.push(newSubTask);
        addNewSubTask(newSubTask);
        subTaskQuery.value="";
    }
}

/**
 * Used to add new sub task information if event is triggered by new-task input text box.
 * 
 * @param {*} event used to get the event keycode.
 */
function addStep(event) {
    var stepQuery = getElementById("enter-step");
    if (event.keyCode === 13 && "" !== stepQuery.value.trim()) {
        var newStep = {};
        newStep.id = generateId();
        newStep.name = stepQuery.value;
        newStep.status = Boolean(true);
        subTaskInfo.steps.push(newStep);
        addNewStep(newStep);
        stepQuery.value="";
    }
}

/**
 * Used to get created element.
 * 
 * @param {*} element denotes type of element to be created.
 */
function createElement(element) {
    return document.createElement(element);
}

/**
 * Used to add new list and it inserted into html to display the name of list.
 * 
 * @param {*} newTask contains the details of new list.
 */
function addNewList(newTask) {
    var createdList = getElementById("new-created-list");
    var newCreatedDiv = createElement("div");
    var spanForImage = createElement("span");
    var spanListName = createElement("span");
    var listIcon = createElement("img");
    listIcon.setAttribute("src","img/bullet-list.svg");
    spanForImage.appendChild(listIcon);
    newCreatedDiv.setAttribute("class","new-list");
    spanListName.className = "left-side-menu";
    spanListName.setAttribute("class","left-side-menu menu-name-visible");
    listInfo = newTask;
    subTask.innerHTML = "";
    spanListName.innerHTML = newTask.name;
    addEventListeners(spanListName,"click",currentTask.bind(newTask));
    newCreatedDiv.appendChild(spanForImage);
    newCreatedDiv.appendChild(spanListName);
    createdList.appendChild(newCreatedDiv);
}

/**
 * Used to trigger to current task and change the task title.
 * remains the input value focused on the sub task box.
 */
function currentTask() {
    var taskName = getElementById("task-title");
    taskName.textContent = this.name;
    listInfo = this;
    displaySubTasks();
}

/**
 * Used to trigger to the current sub task.
 * change the sub task title.
 */
function currentSubTask() {
    var subTaskName = getElementById("sub-task-name");
    subTaskName.textContent = this.name;
    subTaskInfo = this;
    displaySteps();
    var step = getElementById("enter-step");
    step.value = "";
    step.focus();
}

/**
 * Used to generate unique id to all based on date method.
 */
function generateId () {
    return new Date();
}

/**
 * Used to add sub task to the current task.
 * 
 * @param {*} newSubTask contains the details of current sub task. 
 */
function addNewSubTask(newSubTask) {
    var newCreatedDiv = createElement("div");
    var spanListName = createElement("span");
    newCreatedDiv.setAttribute("class","new-sub-task");
    spanListName.className = "middle-sub-task";
    subTaskInfo = newSubTask; 
    step.innerHTML = "";
    spanListName.innerHTML = newSubTask.name;
    addEventListeners(spanListName,"click",currentSubTask.bind(newSubTask));
    newCreatedDiv.appendChild(spanListName);
    subTask.appendChild(newCreatedDiv);
}

/**
 * Used to add step to the specific sub task.
 * 
 * @param {*} newStep contains the details of sub task. 
 */
function addNewStep(newStep) {
    var subTaskBody = getElementById("sub-task-body");
    subTaskBody.setAttribute("class","sub-task-body reduce-width");
    var newCreatedDiv = createElement("div");
    var spanListName = createElement("span");
    newCreatedDiv.setAttribute("class","new-step");
    spanListName.className = "step-info";
    stepInfo = newStep;
    spanListName.innerHTML = newStep.name;  
    newCreatedDiv.appendChild(spanListName);
    getElementById("step-name").appendChild(newCreatedDiv);
}

/**
 * Used to display all sub tasks of specific task.
 */
function displaySubTasks() {
    subTask.innerHTML = "";
    var allSubTasks = listInfo.subTask;
    for (var index in allSubTasks) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        var newCreatedDiv = createElement("div");
        var spanListName = createElement("span");
        newCreatedDiv.setAttribute("class","new-sub-task");
        spanListName.className = "middle-sub-task";
        spanListName.innerHTML = allSubTasks[index].name;
        addEventListeners(spanListName,"click",currentSubTask.bind(allSubTasks[index]));
        newCreatedDiv.appendChild(spanListName);
        subTask.appendChild(newCreatedDiv);
    }

}

/**
 * Used to display all steps of specific sub tasks.
 */
function displaySteps() {
    var stepName = getElementById("step-name");
    var subTaskBody = getElementById("sub-task-body");
    subTaskBody.setAttribute("class","sub-task-body reduce-width");
    var stepBody = getElementById("step-body");
    stepBody.setAttribute("class","step-body increase-width");
    stepName.innerHTML = "";
    var allSteps = subTaskInfo.steps;
    for (var index in allSteps) {
        var newCreatedDiv = createElement("div");
        var spanListName = createElement("span");
        newCreatedDiv.setAttribute("class","new-step");
        spanListName.className = "step-info";
        spanListName.innerHTML = allSteps[index].name;
        newCreatedDiv.appendChild(spanListName);
        step.appendChild(newCreatedDiv);
    }
    console.log(listInfo);
}