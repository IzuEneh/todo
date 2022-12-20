import drawDisplay, {
	addTodoButton as addButton,
	title,
	sideBar,
	drawTodos,
} from "./domController";
import { todoObject } from "./todoFactory";
import {
	openModal,
	closeModal,
	submitButton,
	getFormElements,
	cancelButton,
	clearFormElements,
} from "./components/modal/modal";

const todos = [
	todoObject(
		"test",
		"test of whats to come",
		new Date().toDateString(),
		"low",
		false
	),
	todoObject(
		"test2",
		"cool stuff i am doing",
		new Date().toDateString(),
		"med",
		true
	),
	todoObject(
		"test3",
		"third description",
		new Date().toDateString(),
		"hi",
		false
	),
];

drawDisplay();
drawTodos(todos);
function addTodoObject(e) {
	openModal();
}

function createTodo(e) {
	const { title, priority, dueDate, description } = getFormElements();
	if (title.value == "") {
		return;
	}
	const todo = todoObject(
		title.value,
		description.value,
		dueDate.value,
		priority.value,
		false
	);
	todos.push(todo);
	drawTodos(todos);
	clearFormElements();
	closeModal();
}

function cancelTodo(e) {
	clearFormElements();
	closeModal();
}

addButton.addEventListener("click", addTodoObject);
cancelButton.addEventListener("click", cancelTodo);
submitButton.addEventListener("click", createTodo);
