import drawDisplay, {
	addTodoButton as addButton,
	title,
	sideBar,
	drawTodos,
	setOnEditTodo,
} from "./domController";
import { todoObject } from "./todoFactory";
import {
	openModal,
	closeModal,
	submitButton,
	getFormElements,
	cancelButton,
	clearFormElements,
	openEditModal,
	isEditMode,
} from "./components/modal/modal";

const todos = [
	todoObject(
		"test",
		"test of whats to come",
		new Date().toDateString(),
		"Low",
		false
	),
	todoObject(
		"test2",
		"cool stuff i am doing",
		new Date().toDateString(),
		"Med",
		true
	),
	todoObject(
		"test3",
		"third description",
		new Date().toDateString(),
		"High",
		false
	),
];

drawDisplay();
setOnEditTodo((e) => {
	const index = e.target.dataset.index;
	openEditModal(todos[index], index);
});
drawTodos(todos);
function addTodoObject(e) {
	openModal();
}

function onSubmitTodo(e) {
	const { isEdit, editIndex } = isEditMode();
	const { title, priority, dueDate, description } = getFormElements();
	if (title.value == "" || dueDate.value === "") {
		return;
	}

	const todo = todoObject(
		title.value,
		description.value,
		dueDate.value,
		priority.value,
		false
	);

	isEdit ? todos.splice(editIndex, 1, todo) : todos.push(todo);
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
submitButton.addEventListener("click", onSubmitTodo);
