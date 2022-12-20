import "./todo.css";

export default function todoElement(title, checked, date, description) {
	const li = document.createElement("li");
	const details = document.createElement("details");
	const summary = document.createElement("summary");

	const todoTitle = document.createElement("p");
	todoTitle.textContent = title;
	todoTitle.classList.add("todo-title");

	const todoDate = document.createElement("p");
	todoDate.textContent = date;
	todoDate.classList.add("todo-date");

	const summaryTitle = document.createElement("div");
	summaryTitle.classList.add("summary-title");

	const todoDescription = createDescriptionSection(description);

	summaryTitle.appendChild(todoTitle);
	summaryTitle.appendChild(todoDate);
	summary.appendChild(summaryTitle);
	details.appendChild(summary);
	details.appendChild(todoDescription);
	li.appendChild(details);

	return li;
}

function createDescriptionSection(description) {
	const section = document.createElement("div");
	section.classList.add("description-section");

	const descSection = document.createElement("p");
	descSection.classList.add("description");
	descSection.textContent = description;
	section.appendChild(descSection);

	const buttons = document.createElement("div");
	buttons.classList.add("todo-buttons");
	["Complete", "Edit", "Delete"].forEach((element) => {
		const el = document.createElement("button");
		el.textContent = element;

		buttons.appendChild(el);
	});
	section.appendChild(buttons);

	return section;
}
