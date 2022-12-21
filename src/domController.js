import "./style.css";
import trash from "./assets/trash-icon.png";
import addProject from "./assets/project-icon.png";
import Modal from "./components/modal/modal";
import TodoList from "./components/todoList/TodoList";

const createTitle = () => {
	const title = document.createElement("h1");
	title.classList.add("title");
	title.textContent = "Inbox";
	return title;
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

export let title = createTitle();

export let { sideBar } = sideBarFactory();

const todoList = TodoList();

const modal = Modal();

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

export { todoList, modal };

/**
 * Create factories for todolist and sidebar
 * expose methods to add todo / project
 */
