import "./project.css";
import trash from "./../../assets/trash-icon.png";

function dispatchEvent(e, name) {
	e.target.dispatchEvent(new CustomEvent(name, { bubbles: true }));
}

function createDeleteIcon() {
	const img = document.createElement("img");
	img.src = trash;
	return img;
}

export default function Project(title, todos = []) {
	title = title.charAt(0).toUpperCase() + title.slice(1);
	const img = createDeleteIcon();

	function render() {
		const li = document.createElement("li");
		li.classList.add("project");

		const text = document.createElement("p");
		text.textContent = title;

		li.appendChild(text);
		li.appendChild(img);
		li.addEventListener("click", handleClick);
		return li;
	}

	function handleClick(e) {
		if (e.target == img) {
			dispatchEvent(e, "deleteProject");
			return;
		}
		dispatchEvent(e, "selectProject");
		console.log("selected");
	}

	function addTodo(todo) {
		todos.push(todo);
	}

	function replaceTodo(index, newTodo) {
		todos.splice(index, 1, newTodo);
	}

	function deleteTodo(index) {
		todos.splice(index, 1);
	}

	function getTodos() {
		return todos;
	}

	return { title, render, addTodo, replaceTodo, deleteTodo, getTodos };
}
