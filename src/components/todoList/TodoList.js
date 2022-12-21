import "./todoList.css";
import plus from "./../../assets/plus-icon.png";

const createAddButton = () => {
	const addTodo = document.createElement("div");
	addTodo.classList.add("add-todo");

	const icon = document.createElement("img");
	icon.src = plus;
	addTodo.appendChild(icon);

	const text = document.createElement("p");
	text.classList.add("add-todo-text");
	text.textContent = "Add Todo";
	addTodo.appendChild(text);

	return addTodo;
};

const createTodoList = () => {
	const todoList = document.createElement("ul");
	todoList.classList.add("todo-list");
	return todoList;
};

const createTodoSection = (todoList, addButton) => {
	const todoSection = document.createElement("div");
	todoSection.classList.add("todo-section");
	todoSection.appendChild(todoList);
	todoSection.appendChild(addButton);
	return todoSection;
};

export default function TodoList() {
	const addButton = createAddButton();
	const todoList = createTodoList();
	const todoSection = createTodoSection(todoList, addButton);

	const setOnAddTodo = (addMethod) => {
		addButton.addEventListener("click", addMethod);
	};

	const setOnEditTodo = (editMethod) => {
		todoList.addEventListener("editTodo", editMethod);
	};

	const setOnCompleteTodo = (completeMethod) => {
		todoList.addEventListener("completeTodo", completeMethod);
	};

	const setOnDeleteTodo = (deleteMethod) => {
		todoList.addEventListener("deleteTodo", deleteMethod);
	};

	const removeChildren = () => {
		let child = todoList.lastElementChild;
		while (child) {
			todoList.removeChild(child);
			child = todoList.lastElementChild;
		}
	};

	const drawTodos = (todos) => {
		removeChildren();
		todos.forEach((todo, index) => {
			const element = todo.createElement();
			element.dataset.index = index;
			todoList.appendChild(element);
		});
	};

	return {
		drawTodos,
		setOnAddTodo,
		setOnCompleteTodo,
		setOnEditTodo,
		setOnDeleteTodo,
		todoSection,
	};
}
