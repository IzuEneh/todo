import "./modal.css";

let submitButton = createButton("Submit", "modal-submit");
let cancelButton = createButton("Cancel", "modal-cancel");
let modal = createModal();
const closeModal = () => {
	modal.style.display = "none";
};

const openModal = () => {
	modal.style.display = "block";
	console.log(modal);
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

	const form = createForm();
	container.appendChild(form);
	container.appendChild(createButtons());
	return container;
}

function createForm() {
	const form = document.createElement("form");
	form.classList.add("modal-form");
	const titleInput = document.createElement("input");
	titleInput.placeholder = "Default Title";
	const titleFormElement = createFormElement("Title: ", titleInput);

	const priorityDrop = document.createElement("select");
	["Low", "Med", "High"].forEach((pri) => {
		const option = document.createElement("option");
		option.value = pri.toLowerCase();
		option.textContent = pri;
		priorityDrop.appendChild(option);
	});
	const priorityFormElement = createFormElement("Priority: ", priorityDrop);

	const today = new Date();
	const dueDate = document.createElement("input");
	dueDate.type = "date";
	dueDate.min = todaysDate();
	dueDate.value = todaysDate();
	const dateFormElement = createFormElement("Due Date: ", dueDate);

	const desc = document.createElement("textarea");
	desc.placeholder = "Description";
	const descFormElement = createFormElement("Description: ", desc);

	form.appendChild(titleFormElement);
	form.appendChild(priorityFormElement);
	form.appendChild(dateFormElement);
	form.appendChild(descFormElement);
	return form;
}

function todaysDate() {
	const today = new Date();
	return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function createFormElement(title, element) {
	const formElement = document.createElement("div");
	formElement.classList.add("form-element");
	const label = document.createElement("label");
	label.textContent = title;

	element.classList.add("form-input");

	formElement.appendChild(label);
	formElement.appendChild(element);
	return formElement;
}

function createButtons() {
	const container = document.createElement("div");
	container.classList.add("modal-buttons-section");

	container.appendChild(submitButton);
	container.appendChild(cancelButton);
	return container;
}

function createButton(text, className) {
	const button = document.createElement("div");
	button.classList.add("modal-button");
	button.classList.add(className);
	button.textContent = text;
	return button;
}

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

export { modal, openModal, closeModal, submitButton, cancelButton };
