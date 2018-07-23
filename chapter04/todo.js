let todoList = ["first", "second", "third", "fourth"];

function remember(task) {
    todoList.push(task);
}
function getTask() {
    return todoList.shift();
}
function rememberUrgently(task) {
    todoList.unshift(task);
}
console.log(todoList);

remember("fitth");
console.log(todoList);

console.log(getTask());
console.log(todoList);

rememberUrgently("urgent");
console.log(todoList);

console.log(getTask());
console.log(todoList);