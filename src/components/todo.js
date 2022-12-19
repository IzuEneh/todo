import "./todo.css";

export default function todoElement(title, checked, date, description) {
	const li = document.createElement("li");
	const details = document.createElement("details");
	const summary = document.createElement("summary");

	const todoTitle = document.createElement("p");
	todoTitle.textContent = title;
	todoTitle.classList.add("todo-title");

	const todoDate = document.createElement("p");
	todoDate.textContent = date.toDateString();
	todoDate.classList.add("todo-date");

	const summaryTitle = document.createElement("div");
	summaryTitle.classList.add("summary-title");

	const todoDescription = document.createElement("p");
	todoDescription.classList.add("description");
	todoDescription.textContent = description;

	summaryTitle.appendChild(todoTitle);
	summaryTitle.appendChild(todoDate);
	summary.appendChild(summaryTitle);
	details.appendChild(summary);
	details.appendChild(todoDescription);
	li.appendChild(details);

	li.addEventListener("click", expand);
	return li;
}

function expand(e) {
	console.log("clicked");
}
