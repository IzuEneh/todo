import drawDisplay, {
	setTitle,
	todoList,
	modal,
	projectList,
} from "./domController";
import Todo from "./components/todo/Todo";
import Project from "./components/project/Project";

const projects = [
	Project("inbox", false, [
		Todo(
			"test",
			"test of whats to come",
			new Date().toDateString(),
			"Low",
			false
		),
		Todo(
			"test2",
			"cool stuff i am doing",
			new Date().toDateString(),
			"Med",
			true
		),
		Todo(
			"test3",
			"third description",
			new Date().toDateString(),
			"High",
			false
		),
	]),
	Project("this week"),
	Project("this month"),
];

let currentProject = null;

drawDisplay();

setSelected(projects[0]);

projectList.setOnSelectProject(handleSelectProject);

projectList.setOnAddProject(handleNewProject);

projectList.setOnDeleteProject(handleDeleteProject);

todoList.setOnEditTodo(handleEditTodo);

todoList.setOnCompleteTodo(handleCompleteTodo);

todoList.setOnDeleteTodo(handleDeleteTodo);

todoList.setOnAddTodo(handleOpenTodo);

modal.onSubmit(handleSubmitTodo);

modal.onCancel(handleCancelTodo);

function setSelected(project) {
	if (currentProject) {
		currentProject.isSelected = false;
	}

	project.isSelected = true;
	currentProject = project;
	projectList.renderProjects(projects);
	todoList.drawTodos(currentProject.todos);
	setTitle(currentProject.title);
}

function handleSelectProject(e) {
	const index = e.target.dataset.index;
	setSelected(projects[index]);
}

function handleNewProject(e) {
	const title = projectList.getInputValue();
	projectList.resetInput();

	const project = Project(title);
	projects.push(project);
	setSelected(project);
}

function handleDeleteProject(e) {
	const index = e.target.parentNode.dataset.index;
	if (projects[index] === currentProject) {
		setSelected(projects[index - 1]);
	}
	projects.splice(index, 1);
	projectList.renderProjects(projects);
}

function handleEditTodo(e) {
	const index = e.target.dataset.index;
	modal.openEditMode(currentProject.todos[index], index);
}

function handleCompleteTodo(e) {
	const index = e.target.dataset.index;
	let completedTodo = currentProject.todos[index];
	completedTodo.completed = !completedTodo.completed;
	currentProject.replaceTodo(index, completedTodo);
	reloadTodos();
}

function handleDeleteTodo(e) {
	const index = e.target.dataset.index;
	currentProject.deleteTodo(index);
	reloadTodos();
}

function handleOpenTodo(e) {
	modal.open();
}

function handleSubmitTodo(e) {
	const { isEdit, editIndex } = modal.isEditMode();
	const { title, priority, dueDate, description } = modal.getFormValues();
	if (title.value == "" || dueDate.value === "") {
		return;
	}

	const todo = Todo(
		title.value,
		description.value,
		dueDate.value,
		priority.value,
		false
	);

	isEdit
		? currentProject.replaceTodo(editIndex, todo)
		: currentProject.addTodo(todo);

	modal.clearForm();
	modal.close();
	reloadTodos();
}

function handleCancelTodo(e) {
	modal.clearForm();
	modal.close();
}

function reloadTodos() {
	todoList.drawTodos(currentProject.todos);
}
