import drawDisplay, { title, sideBar, todoList, modal } from "./domController";
import Todo from "./components/todo/Todo";

const todos = [
	Todo(
		"test",
		"test of whats to come",
		new Date().toDateString(),
		"Low",
		false
	),
	Todo(
		"test2",
		"cool stuff i am doing",
		new Date().toDateString(),
		"Med",
		true
	),
	Todo("test3", "third description", new Date().toDateString(), "High", false),
];

drawDisplay();

todoList.drawTodos(todos);

todoList.setOnEditTodo(handleEditTodo);

todoList.setOnCompleteTodo(handleCompleteTodo);

todoList.setOnDeleteTodo(handleDeleteTodo);

todoList.setOnAddTodo(handleOpenTodo);

modal.onSubmit(handleSubmitTodo);

modal.onCancel(handleCancelTodo);

function handleEditTodo(e) {
	const index = e.target.dataset.index;
	modal.openEditMode(todos[index], index);
}

function handleCompleteTodo(e) {
	const index = e.target.dataset.index;
	let completedTodo = todos[index];
	completedTodo.completed = !completedTodo.completed;
	todos.splice(index, 1, completedTodo);
	todoList.drawTodos(todos);
}

function handleDeleteTodo(e) {
	const index = e.target.dataset.index;
	todos.splice(index, 1);
	todoList.drawTodos(todos);
}

function handleOpenTodo(e) {
	modal.open();
}

function handleSubmitTodo(e) {
	const { isEdit, editIndex } = modal.isEditMode();
	const { title, priority, dueDate, description } = modal.getFormValues();
	if (title.value == "" || dueDate.value === "") {
		return;
	}

	const todo = Todo(
		title.value,
		description.value,
		dueDate.value,
		priority.value,
		false
	);

	isEdit ? todos.splice(editIndex, 1, todo) : todos.push(todo);
	todoList.drawTodos(todos);
	modal.clearForm();
	modal.close();
}

function handleCancelTodo(e) {
	modal.clearForm();
	modal.close();
}
