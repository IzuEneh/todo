import "./modal.css";
const priorities = {
	low: "Low",
	med: "Med",
	hi: "High",
};
let submitButton = createButton("Submit", "modal-submit", "submit");
let cancelButton = createButton("Cancel", "modal-cancel", "button");
let form = createForm();
let modal = createModal();
const closeModal = () => {
	modal.style.display = "none";
};

const openModal = () => {
	console.log(form);
	modal.style.display = "block";
};

function createModal() {
	const container = document.createElement("div");
	container.classList.add("modal-container");

	const content = createContent();
	container.appendChild(content);

	return container;
}

function createContent() {
	const container = document.createElement("div");
	container.classList.add("modal-content");
	container.appendChild(form);
	return container;
}

function createForm() {
	const form = document.createElement("form");
	form.classList.add("modal-form");
	const titleInput = document.createElement("input");
	titleInput.placeholder = "Default Title";
	const titleFormElement = createFormElement("Title: ", titleInput, true);

	const priorityDrop = document.createElement("select");
	Object.values(priorities).forEach((pri) => {
		const option = document.createElement("option");
		option.value = pri;
		option.textContent = pri;
		priorityDrop.appendChild(option);
	});
	const priorityFormElement = createFormElement(
		"Priority: ",
		priorityDrop,
		true
	);

	const dueDate = document.createElement("input");
	dueDate.type = "date";
	dueDate.min = todaysDate();
	dueDate.value = todaysDate();
	const dateFormElement = createFormElement("Due Date: ", dueDate, false);

	const desc = document.createElement("textarea");
	desc.placeholder = "Description";
	const descFormElement = createFormElement("Description: ", desc, false);

	form.appendChild(titleFormElement);
	form.appendChild(priorityFormElement);
	form.appendChild(dateFormElement);
	form.appendChild(descFormElement);
	form.appendChild(createButtonSection());
	return form;
}

function todaysDate() {
	const today = new Date();
	return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function createFormElement(title, element, isRequired) {
	const formElement = document.createElement("div");
	formElement.classList.add("form-element");
	const label = document.createElement("label");
	label.textContent = title;

	element.classList.add("form-input");
	element.required = `${isRequired}`;

	formElement.appendChild(label);
	formElement.appendChild(element);
	return formElement;
}

function createButtonSection() {
	const container = document.createElement("div");
	container.classList.add("modal-buttons-section");

	container.appendChild(submitButton);
	container.appendChild(cancelButton);
	return container;
}

function createButton(text, className, type) {
	const button = document.createElement("button");
	button.type = type;
	button.classList.add("modal-button");
	button.classList.add(className);
	button.textContent = text;
	return button;
}

function getFormElements() {
	return {
		title: form[0],
		priority: form[1],
		dueDate: form[2],
		description: form[3],
	};
}

function clearFormElements() {
	form.reset();
	form.dataset.isEdit = false;
	// form.dataset.editIndex = null;
	form[2].value = todaysDate();
}

function openEditModal(todo, index) {
	form[0].value = todo.title;
	form[1].value = todo.priority;
	form[2].value = todo.dueDate;
	form[3].value = todo.description;
	form.dataset.isEdit = true;
	form.dataset.editIndex = index;
	// console.log(form);
	openModal();
}

function isEditMode() {
	console.log(`is edit from form: ${form.dataset.isEdit}`);
	return {
		isEdit: form.dataset.isEdit === "true",
		editIndex: form.dataset.editIndex,
	};
}

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

export {
	modal,
	openModal,
	closeModal,
	submitButton,
	cancelButton,
	getFormElements,
	clearFormElements,
	openEditModal,
	isEditMode,
};
