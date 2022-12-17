import "./todo.css";

export default function createTodo(title, checked, date) {
	const li = document.createElement("li");
	const todoBody = document.createElement("div");
	todoBody.classList.add("todo");

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.checked = checked;
	checkbox.classList.add("todo-checkbox");

	const todoTitle = document.createElement("p");
	todoTitle.textContent = title;
	todoTitle.classList.add("todo-title");

	const todoDate = document.createElement("p");
	todoDate.textContent = date.toDateString();
	todoDate.classList.add("todo-date");

	todoBody.appendChild(checkbox);
	todoBody.appendChild(todoTitle);
	todoBody.appendChild(todoDate);
	li.appendChild(todoBody);
	return li;
}
