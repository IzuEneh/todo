import "./modal.css";
import Formatter from "../../DateFormatter";

const dateFormatter = Formatter();
const priorities = {
	low: "Low",
	med: "Med",
	hi: "High",
};

function createModal(form) {
	const container = document.createElement("div");
	container.classList.add("modal-container");

	const content = document.createElement("div");
	content.classList.add("modal-content");
	content.appendChild(form);
	container.appendChild(content);

	return container;
}

function createForm(submitButton, cancelButton) {
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

	const buttonSection = createButtonSection(submitButton, cancelButton);

	form.appendChild(titleFormElement);
	form.appendChild(priorityFormElement);
	form.appendChild(dateFormElement);
	form.appendChild(descFormElement);
	form.appendChild(buttonSection);
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

function createButtonSection(submitButton, cancelButton) {
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

export default function Modal() {
	const submitButton = createButton("Submit", "modal-submit", "submit");
	const cancelButton = createButton("Cancel", "modal-cancel", "button");
	const form = createForm(submitButton, cancelButton);
	const modal = createModal(form);

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};

	const close = () => {
		modal.style.display = "none";
	};

	const open = () => {
		modal.style.display = "block";
	};

	const openEditMode = (todo, index) => {
		form[0].value = todo.title;
		form[1].value = todo.priority;
		form[2].value = dateFormatter.toInputValue(todo.dueDate);
		form[3].value = todo.description;
		form.dataset.isEdit = true;
		form.dataset.editIndex = index;
		open();
	};

	const isEditMode = () => {
		return {
			isEdit: form.dataset.isEdit === "true",
			editIndex: form.dataset.editIndex,
		};
	};

	const clearForm = () => {
		form.reset();
		form.dataset.isEdit = false;
		form[2].value = todaysDate();
	};

	const getFormValues = () => {
		return {
			title: form[0],
			priority: form[1],
			dueDate: form[2],
			description: form[3],
		};
	};

	const onSubmit = (submitMethod) => {
		submitButton.addEventListener("click", submitMethod);
	};

	const onCancel = (cancelMethod) => {
		cancelButton.addEventListener("click", cancelMethod);
	};

	return {
		modal,
		open,
		close,
		openEditMode,
		isEditMode,
		clearForm,
		getFormValues,
		onSubmit,
		onCancel,
	};
}

export { priorities };
