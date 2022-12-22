import "./style.css";
import Modal from "./components/modal/modal";
import TodoList from "./components/todoList/TodoList";
import ProjectList from "./components/projectList/ProjectList";

const todoList = TodoList();

const modal = Modal();

const projectList = ProjectList();

const title = createTitle();

const sideBar = sideBarFactory();

function setTitle(newTitle) {
	title.textContent = newTitle;
}

function createTitle() {
	const title = document.createElement("h1");
	title.classList.add("title");
	title.textContent = "Inbox";
	return title;
}

function sideBarFactory() {
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

	sideBarWrapper.appendChild(projectList.projectSection);

	sideBar.appendChild(sideBarWrapper);

	return sideBar;
}

export default function drawDisplay() {
	const body = document.querySelector("body");
	const content = document.createElement("div");
	content.classList.add("content");

	const main = document.createElement("div");
	main.classList.add("main");

	const titleSection = document.createElement("div");
	titleSection.classList.add("title-section");
	titleSection.classList.add("top-section");
	titleSection.appendChild(title);

	main.appendChild(titleSection);
	main.appendChild(todoList.todoSection);

	content.appendChild(sideBar);
	content.appendChild(main);
	body.appendChild(content);
	body.appendChild(modal.modal);
}

export { todoList, modal, projectList, setTitle };
