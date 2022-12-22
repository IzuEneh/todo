import Project from "./components/project/Project";
import Todo from "./components/todo/Todo";
import { priorities } from "./components/modal/modal";
import Formatter from "./DateFormatter";

const dateFormatter = Formatter();
const defaultProject = [
	Project("inbox", true, [
		Todo(
			"welcome",
			"This is an example todo play around to see how this site works",
			dateFormatter.now(),
			priorities.low,
			false
		),
	]),
];

function getTodos(objectArray) {
	const result = objectArray.map((object) =>
		Todo(
			object.title,
			object.description,
			object.dueDate,
			object.priority,
			object.completed
		)
	);
	return result;
}
export default function Storage() {
	const storageName = "projects";
	const getProjects = () => {
		const projects = localStorage.getItem(storageName);
		if (!projects) {
			return defaultProject;
		}

		const converted = JSON.parse(projects);
		const objects = converted.map((proj) => {
			return Project(proj.title, proj.isSelected, getTodos(proj.todos));
		});
		return objects;
	};

	const save = (projects) => {
		const json = [];
		projects.forEach((project) => json.push(project.toJson()));
		const stringified = JSON.stringify(json);
		localStorage.setItem(storageName, stringified);
	};

	const deleteHistory = () => {
		localStorage.clear();
	};
	return { save, getProjects, deleteHistory };
}
