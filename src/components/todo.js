import "./todo.css";

export default function todoElement(todo, onEdit) {
	const li = document.createElement("li");
	const details = document.createElement("details");
	const summary = document.createElement("summary");

	const todoTitle = document.createElement("p");
	todoTitle.textContent = todo.title;
	todoTitle.classList.add("todo-title");
	if (todo.completed) {
		todoTitle.classList.add("completed");
	}

	const priority = document.createElement("p");
	priority.textContent = todo.priority;
	priority.classList.add("todo-priority");
	priority.classList.add(`${todo.priority}-priority`);

	const todoDate = document.createElement("p");
	todoDate.textContent = todo.dueDate;
	todoDate.classList.add("todo-date");

	const summaryTitle = document.createElement("div");
	summaryTitle.classList.add("summary-title");

	const todoDescription = createDescriptionSection(
		todo.description,
		todo.completed
	);

	summaryTitle.appendChild(todoTitle);
	summaryTitle.appendChild(priority);
	summaryTitle.appendChild(todoDate);
	summary.appendChild(summaryTitle);
	details.appendChild(summary);
	details.appendChild(todoDescription);
	li.appendChild(details);
	setEventListeners(li);

	return li;
}

function createDescriptionSection(description, isCompleted) {
	const section = document.createElement("div");
	section.classList.add("description-section");

	const descSection = document.createElement("p");
	descSection.classList.add("description");
	descSection.textContent = description;
	section.appendChild(descSection);

	const buttons = document.createElement("div");
	buttons.classList.add("todo-buttons");

	const completeButton = createButton("Complete");
	completeButton.textContent = isCompleted ? "Mark Incomplete" : "Complete";
	completeButton.addEventListener("click", onComplete);
	buttons.appendChild(completeButton);

	const editButton = createButton("Edit");
	editButton.addEventListener("click", onEdit);
	buttons.appendChild(editButton);

	const deleteButton = createButton("Delete");
	deleteButton.addEventListener("click", onDelete);
	buttons.appendChild(deleteButton);

	section.appendChild(buttons);

	return section;
}

function createButton(title) {
	const button = document.createElement("button");
	button.classList.add("desc-button");
	button.classList.add(`${title.toLowerCase()}-button`);
	button.textContent = title;
	return button;
}

function setEventListeners(li) {
	li.addEventListener("editButtonPressed", (e) => {
		li.dispatchEvent(new CustomEvent("editTodo", { bubbles: true }));
	});

	li.addEventListener("completeButtonPressed", (e) => {
		li.dispatchEvent(new CustomEvent("completeTodo", { bubbles: true }));
	});

	li.addEventListener("deleteButtonPressed", (e) => {
		li.dispatchEvent(new CustomEvent("deleteTodo", { bubbles: true }));
	});
}

function onEdit(e) {
	e.target.dispatchEvent(
		new CustomEvent("editButtonPressed", { bubbles: true })
	);
}

function onComplete(e) {
	e.target.dispatchEvent(
		new CustomEvent("completeButtonPressed", { bubbles: true })
	);
}

function onDelete(e) {
	e.target.dispatchEvent(
		new CustomEvent("deleteButtonPressed", { bubbles: true })
	);
}
