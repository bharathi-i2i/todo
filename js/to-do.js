"use strict";
init();

var tasks = [];
var listInfo = "";
var subTaskInfo = "";
var stepInfo = "";

var step = takeComponentById("step-name");

/**
 * Used to bind all event listeners in the initial load of the page. 
 */
function init() {
    addEventListeners(takeComponentById("main-menu"),"click",openMenu);
    addEventListeners(takeComponentById("add-task"),"click",openMenuForPlusIcon);
    addEventListeners(takeComponentById("new-list"),"keyup",addTask);
    addEventListeners(takeComponentById("enter-task"),"keyup",addSubTask);
    addEventListeners(takeComponentById("enter-step"),"keyup",addStep);
    addEventListeners(takeComponentById("task-name-on-sub-task"),"keyup",updateTaskName);
    addEventListeners(takeComponentById("sub-task-name-on-step"),"keyup",updateSubTaskName);
}

/**
 * Used to add event and callback the function if the event is triggered.
 * 
 * @param {Element} element containing element to which event to be added.
 * @param {Event} selectedEvent contains the event on which the callback has to be triggered.
 * @param {Function} resultOperation the function to be called if the event is triggered.
 */
function addEventListeners(element,action,resultOperation) {
    element.bind(action,resultOperation);
}

/**
 * Used to get the element by the help of the id. 
 * 
 * @param {String} id denotes the id of the element to be fetched.
 */
function takeComponentById(id) {
    return $("#" + id);
}

/**
 * Used to get the element by the help of the className. 
 * 
 * @param {String} className denotes the className of the element to be fetched.
 */
function takeComponentByClassName(className) {
    return $("." + className);
}

/**
 * Used to get created element.
 * 
 * @param {Element} element denotes type of element to be created.
 */
function buildComponent(element) {
    return $(document.createElement(element));
}

/**
 * Used to generate unique id to all based on date method.
 */
 function generateId () {
    return new Date();
}

/**
 * Used to toggle the side menu bar.
 */
function openMenu() {
    var leftMenu = takeComponentById("menu");
    var menuDiv = takeComponentById("menu-bar");
    var menuNames = takeComponentByClassName("left-side-menu");
    if (leftMenu.val() === "closed") {
        menuDiv.removeClass("menu-bar-close");
        menuDiv.addClass("menu-bar-open");
        leftMenu.val("opened");
        menuNames.toggle();
    } else {
        menuDiv.removeClass("menu-bar-open");
        menuDiv.addClass("menu-bar-close");
        leftMenu.val("closed");
        menuNames.toggle();
    }
}

/**
 * Used to open the menu bar while click plus icon.
 */
function openMenuForPlusIcon() {
    var leftMenu = takeComponentById("menu");
    var menuDiv = takeComponentById("menu-bar");
    var menuNames = takeComponentByClassName("left-side-menu");
    if (leftMenu.val() === "closed") {
        menuDiv.removeClass("menu-bar-close");
        menuDiv.addClass("menu-bar-open");
        leftMenu.val("opened");
        //menuNames.addClass("menu-name-visible");
        menuNames.toggle();
    }
}

/**
 * Used to add the new task if event is triggered in the new list input text box.
 * 
 * @param {Event} event used to get the event keycode.
 */
function addTask(event) {
    var newListValue = takeComponentById("new-list");
    var taskName = takeComponentById("task-name-on-sub-task");
    var subTaskBody = takeComponentById("sub-task-body");
    var subTask = takeComponentById("sub-task");
    var stepBody = takeComponentById("step-body");
    var taskQuery = takeComponentById("enter-task");
    if (event.keyCode === 13 && "" !== newListValue.val().trim()) {
        subTaskBody.attr("class","sub-task-body increase-sub-task-width");
        stepBody.attr("class","step-body reduce-step-width");
        var newTask = {};
        newTask.id = generateId();
        newTask.name = newListValue.val();
        newTask.status = Boolean(true);
        newTask.subTask = [];
        tasks.push(newTask);
        subTask.html("");
        displayTasks();
        taskName.value = newTask.name;
        taskQuery.val("");
        taskQuery.focus();
        newListValue.val("");
    }
}

/**
 * Used to add new sub task information if event is triggered by new-task input text box.
 * 
 * @param {Event} event used to get the event keycode.
 */
function addSubTask(event) {
    var subTaskQuery = takeComponentById("enter-task");
    if (event.keyCode === 13 && "" !== subTaskQuery.val().trim()) {
        var newSubTask = {};
        newSubTask.id = generateId();
        newSubTask.name = subTaskQuery.val();
        newSubTask.status = Boolean(false);
        newSubTask.steps = [];
        listInfo.subTask.push(newSubTask);
        displaySubTasks();
        subTaskQuery.val("");
    }
}

/**
 * Used to add new sub task information if event is triggered by new-task input text box.
 * 
 * @param {Event} event used to get the event keycode.
 */
function addStep(event) {
    var stepQuery = takeComponentById("enter-step");
    if (event.keyCode === 13 && "" !== stepQuery.val().trim()) {
        var newStep = {};
        newStep.id = generateId();
        newStep.name = stepQuery.val();
        newStep.status = Boolean(false);
        subTaskInfo.steps.push(newStep);
        displaySteps();
        stepQuery.val("");
    }
}

/**
 * Used to update task name in task division.
 * 
 * @param {Event} event used to get event key code. 
 */
function updateTaskName(event) {
    if (event.keyCode === 13) {
        listInfo.name = takeComponentById("task-name-on-sub-task").value;
        displayTasks();
    }
}

/**
 * Used to update sub task name in sub task division.
 * 
 * @param {Event} event used to get event key code. 
 */
function updateSubTaskName(event) {
    if (event.keyCode === 13) {
        subTaskInfo.name = takeComponentById("sub-task-name-on-step").value;
        displaySubTasks();
    }
}

/**
 * Used to display Tasks in task division and also add task.
 */
function displayTasks() {
    var task = takeComponentById("new-created-list");
    task.html("");
    var allTasks = tasks;
    for ( var index in tasks ) {
        var newCreatedDiv = buildComponent("div");
        var spanForImage = buildComponent("span");
        var spanListName = buildComponent("span");
        var listIcon = buildComponent("img");
        listIcon.attr("src","img/bullet-list.svg");
        listIcon.appendTo(spanForImage);
        newCreatedDiv.attr("class","new-list");
        spanListName.className = "left-side-menu";
        spanListName.attr("class","left-side-menu menu-name-visible");
        listInfo = tasks[index];
        spanListName.html(listInfo.name);
        addEventListeners(spanListName,"click",currentTask.bind(listInfo));
        spanForImage.appendTo(newCreatedDiv);
        spanListName.appendTo(newCreatedDiv);
        newCreatedDiv.appendTo(task);
    }
}

/**
 * Used to trigger to current task and change the task title.
 * remains the input value focused on the sub task box.
 */
function currentTask() {
    var subTaskBody = takeComponentById("sub-task-body");
    var stepBody = takeComponentById("step-body");
    subTaskBody.attr("class","sub-task-body increase-sub-task-width");
    stepBody.attr("class","step-body reduce-step-width");
    var taskName = takeComponentById("task-name-on-sub-task");
    taskName.value = this.name;
    listInfo = this;
    displaySubTasks();
}

/**
 * Used to trigger to the current sub task.
 * change the sub task title.
 */
function currentSubTask() {
    var subTaskName = takeComponentById("sub-task-name-on-step");
    var isComplete = this.status;
    var check = takeComponentById("check-box");
    if(!isComplete) {
        check.attr("src","img/check-mark.svg");
        subTaskName.attr("class","sub-task-name-on-step non-strike")
    } else {
        check.attr("src","img/check.svg");
        subTaskName.attr("class","sub-task-name-on-step strike")
    }
    subTaskName.val(this.name);
    subTaskInfo = this;
    displaySteps();
    var step = takeComponentById("enter-step");
    step.val("");
    step.focus();
}

/**
 * Used to display all sub tasks of specific task and also add task.
 */
function displaySubTasks() {
    var subTask = takeComponentById("sub-task");
    subTask.html("");
    var allSubTasks = listInfo.subTask;
    for (var index in allSubTasks) {
        var isComplete = allSubTasks[index].status;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        var newCreatedDiv = buildComponent("div");
        var spanForImage = buildComponent("span");
        var spanListName = buildComponent("span");
        spanListName.addClass("middle-sub-task");
        var spanForLine = buildComponent("div");
        var listIcon = buildComponent("img");
        if (!isComplete) {
            listIcon.attr("src","img/check-mark.svg");
            spanListName.attr("class","middle-sub-task non-strike");
        } else {
            listIcon.attr("src","img/check.svg");
            spanListName.attr("class","middle-sub-task strike");
        }
        listIcon.appendTo(spanForImage);
        newCreatedDiv.attr("class","new-sub-task");
        spanListName.html(allSubTasks[index].name);
        addEventListeners(spanForImage,"click",strikeSubTask.bind(allSubTasks[index]));
        addEventListeners(spanListName,"click",currentSubTask.bind(allSubTasks[index]));
        spanForImage.appendTo(newCreatedDiv);
        spanListName.appendTo(newCreatedDiv);
        spanForLine.addClass("background-lines");
        newCreatedDiv.appendTo(subTask);
        spanForLine.appendTo(subTask);
    }
}

/**
 * Used to display all steps of specific sub tasks.
 */
function displaySteps() {
    var stepName = takeComponentById("step-name");
    var subTaskBody = takeComponentById("sub-task-body");
    subTaskBody.attr("class","sub-task-body reduce-width");
    var stepBody = takeComponentById("step-body");
    stepBody.attr("class","step-body increase-width");
    stepName.html("");
    var allSteps = subTaskInfo.steps;
    for (var index in allSteps) {
        var isComplete = allSteps[index].status;
        var newCreatedDiv = buildComponent("div");
        var spanForImage = buildComponent("span");
        var spanListName = buildComponent("span");
        spanListName.addClass("step-info");
        var spanForLine = buildComponent("div");
        var listIcon = buildComponent("img");
        if (!isComplete) {
            listIcon.attr("src","img/check-mark.svg");
            spanListName.attr("class","step-info non-strike");
        } else {
            listIcon.attr("src","img/check.svg");
            spanListName.attr("class","step-info strike");
        }
        listIcon.appendTo(spanForImage);
        newCreatedDiv.attr("class","new-step");
        spanListName.html(allSteps[index].name);
        addEventListeners(spanForImage,"click",strikeStep.bind(allSteps[index]));
        spanForImage.appendTo(newCreatedDiv);
        spanListName.appendTo(newCreatedDiv);
        spanForLine.addClass("background-lines");
        newCreatedDiv.appendTo(step);
        spanForLine.appendTo(step);
    }
}

/**
 * Used to strike the sub task based on its status.
 */
function strikeSubTask() {
    var subTaskName = takeComponentById("sub-task-name-on-step");
    var check = takeComponentById("check-box");
    var isComplete = this.status;
    if(!isComplete) {
        this.status = Boolean(true);
        check.attr("src","img/check.svg");
        subTaskName.attr("class","sub-task-name-on-step strike");
        displaySubTasks();
    } else {
        this.status = Boolean(false);
        check.attr("src","img/check-mark.svg");
        subTaskName.attr("class","sub-task-name-on-step non-strike");
        displaySubTasks();
    }
    subTaskName.val(this.name);
    subTaskInfo = this;
    displaySteps();
}

/**
 * Used to strike the step based on its status.
 */
function strikeStep() {
    var isComplete = this.status;
    if(!isComplete) {
        this.status = Boolean(true);
    } else {
        this.status = Boolean(false);
    }
    displaySteps();
}
