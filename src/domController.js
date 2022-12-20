import "./style.css";
import plus from "./assets/plus-icon.png";
import trash from "./assets/trash-icon.png";
import addProject from "./assets/project-icon.png";
import todoElement from "./components/todo";
import { modal } from "./components/modal/modal";

const createTitle = () => {
	const title = document.createElement("h1");
	title.classList.add("title");
	title.textContent = "Inbox";
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

const sideBarFactory = () => {
	const sideBar = document.createElement("div");
	sideBar.classList.add("side-bar");

	const sideBarWrapper = document.createElement("div");
	sideBarWrapper.classList.add("sidebar-wrapper");

	const titleSection = document.createElement("div");
	titleSection.classList.add("sidebar-title");
	titleSection.classList.add("top-section");

	const title = document.createElement("p");
	title.textContent = "Projects";
	titleSection.appendChild(title);
	sideBarWrapper.appendChild(titleSection);

	const projectSection = document.createElement("div");
	projectSection.classList.add("projects-Section");
	const projects = document.createElement("ul");
	["Inbox", "This week", "This month"].forEach((proj) => {
		createProject(proj);
	});

	const addButton = document.createElement("div");
	addButton.classList.add("add-project");
	const addProjectImg = document.createElement("img");
	addProjectImg.src = addProject;
	addButton.appendChild(addProjectImg);

	const addText = document.createElement("p");
	addText.textContent = "Add Project";
	addButton.appendChild(addText);

	projectSection.appendChild(projects);
	projectSection.appendChild(addButton);
	sideBarWrapper.appendChild(projectSection);

	sideBar.appendChild(sideBarWrapper);

	function createProject(name) {
		const li = document.createElement("li");

		const text = document.createElement("p");
		text.textContent = name;

		const img = document.createElement("img");
		img.src = trash;
		li.appendChild(text);
		li.appendChild(img);
		projects.appendChild(li);
	}
	return { sideBar, addButton };
};

const createTodoList = () => {
	const todoList = document.createElement("ul");
	todoList.classList.add("todo-list");
	return todoList;
};

export let addTodoButton = createAddButton();

export let title = createTitle();

export let { sideBar } = sideBarFactory();

let todoList = createTodoList();

export const addTodo = (todo) => {
	const element = todoElement(
		todo.title,
		todo.completed,
		todo.dueDate,
		todo.description
	);
	todoList.appendChild(element);
};

export default function drawDisplay() {
	const body = document.querySelector("body");
	const content = document.createElement("div");
	content.classList.add("content");

	const main = document.createElement("div");
	main.classList.add("main");

	const todoStuff = document.createElement("div");
	todoStuff.classList.add("todo-section");
	todoStuff.appendChild(todoList);
	todoStuff.appendChild(addTodoButton);

	const titleSection = document.createElement("div");
	titleSection.classList.add("title-section");
	titleSection.classList.add("top-section");
	titleSection.appendChild(title);

	main.appendChild(titleSection);
	main.appendChild(todoStuff);

	content.appendChild(sideBar);
	content.appendChild(main);
	body.appendChild(content);
	body.appendChild(modal);
}

/**
 * Create factories for todolist and sidebar
 * expose methods to add todo / project
 */
