import "./projectList.css";
import addProject from "./../../assets/project-icon.png";
import confirm from "./../../assets/check-icon.png";
import cancel from "./../../assets/cancel-icon.png";
import Project from "./../project/Project";

const createAddButton = () => {
	const addButton = document.createElement("div");
	addButton.classList.add("add-project");
	const addProjectImg = document.createElement("img");
	addProjectImg.src = addProject;
	addButton.appendChild(addProjectImg);
	const addText = document.createElement("p");
	addText.textContent = "Add Project";
	addButton.appendChild(addText);

	return addButton;
};

const createProjectSection = (projects, addButton) => {
	const projectSection = document.createElement("div");
	projectSection.classList.add("projects-Section");

	projectSection.appendChild(projects);
	projectSection.appendChild(addButton);
	return projectSection;
};

const createConfirmButton = () => {
	const checkImg = document.createElement("img");
	checkImg.src = confirm;
	checkImg.classList.add("check-img");
	return checkImg;
};

const createInput = () => {
	const input = document.createElement("input");
	input.classList.add("new-project-input");
	input.placeholder = "New Project Title";
	return input;
};

export default function ProjectList() {
	const projectList = document.createElement("ul");
	const confirmButton = createConfirmButton();
	const addButton = createAddButton();
	const input = createInput();
	const projectSection = createProjectSection(projectList, addButton);

	addButton.addEventListener("click", (e) => {
		const li = document.createElement("li");
		li.classList.add("project");
		li.classList.add("new-project");

		const cancelImage = document.createElement("img");
		cancelImage.src = cancel;
		cancelImage.addEventListener("click", (e) => {
			projectList.removeChild(li);
		});

		li.appendChild(input);
		li.appendChild(confirmButton);
		li.appendChild(cancelImage);
		projectList.appendChild(li);
		input.focus();
	});

	const removeChildren = () => {
		let child = projectList.lastElementChild;
		while (child) {
			projectList.removeChild(child);
			child = projectList.lastElementChild;
		}
	};

	const renderProjects = (projects) => {
		removeChildren();
		projects.forEach((proj, index) => {
			const element = proj.render();
			element.dataset.index = index;
			projectList.appendChild(element);
		});
	};

	const setOnSelectProject = (selectMethod) => {
		projectList.addEventListener("selectProject", selectMethod);
	};

	const setOnDeleteProject = (deleteMethod) => {
		projectList.addEventListener("deleteProject", deleteMethod);
	};

	const setOnAddProject = (addMethod) => {
		confirmButton.addEventListener("click", addMethod);
	};

	const getInputValue = () => {
		return input.value;
	};

	const resetInput = () => {
		input.value = "";
	};

	return {
		projectSection,
		renderProjects,
		setOnDeleteProject,
		setOnSelectProject,
		setOnAddProject,
		getInputValue,
		resetInput,
	};
}
