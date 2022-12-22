import "./todo.css";

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

export default function Todo(title, description, dueDate, priority, completed) {
	title = title.charAt(0).toUpperCase() + title.slice(1);

	function createElement() {
		const li = document.createElement("li");
		const details = document.createElement("details");
		const summary = document.createElement("summary");

		const todoTitle = document.createElement("p");
		todoTitle.textContent = this.title;
		todoTitle.classList.add("todo-title");
		if (this.completed) {
			todoTitle.classList.add("completed");
		}

		const displayPriority = document.createElement("p");
		displayPriority.textContent = this.priority;
		displayPriority.classList.add("todo-priority");
		displayPriority.classList.add(`${priority}-priority`);

		const todoDate = document.createElement("p");
		todoDate.textContent = this.dueDate;
		todoDate.classList.add("todo-date");

		const summaryTitle = document.createElement("div");
		summaryTitle.classList.add("summary-title");

		const todoDescription = createDescriptionSection(
			this.description,
			this.completed
		);

		summaryTitle.appendChild(todoTitle);
		summaryTitle.appendChild(displayPriority);
		summaryTitle.appendChild(todoDate);
		summary.appendChild(summaryTitle);
		details.appendChild(summary);
		details.appendChild(todoDescription);
		li.appendChild(details);
		setEventListeners(li);

		return li;
	}

	function toJson() {
		return { title, description, dueDate, priority, completed: this.completed };
	}

	return {
		title,
		description,
		dueDate,
		priority,
		completed,
		createElement,
		toJson,
	};
}
