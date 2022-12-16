import "./style.css";
import plus from "./plus-icon.png";

const createTitle = () => {
	const title = document.createElement("h1");
	title.classList.add("title");
	title.textContent = "TodoList";
	return title;
};

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

const createSideBar = () => {
	const sideBar = document.createElement("div");
	sideBar.classList.add("side-bar");
	return sideBar;
};

export let addTodo = createAddButton();

export let title = createTitle();

export let sideBar = createSideBar();

export default function drawDisplay() {
	const body = document.querySelector("body");
	const content = document.createElement("div");
	content.classList.add("content");

	const main = document.createElement("div");
	main.classList.add("main");

	main.appendChild(title);
	main.appendChild(addTodo);

	content.appendChild(sideBar);
	content.appendChild(main);
	body.appendChild(content);
}
