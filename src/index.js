import drawDisplay, {
	addTodoButton as addButton,
	title,
	sideBar,
	addTodo,
} from "./domController";
import { todoObject } from "./todoFactory";

const todos = [
	todoObject("test", "test of whats to come", new Date(), "low", false),
	todoObject("test2", "cool stuff i am doing", new Date(), "med", true),
	todoObject("test3", "third description", new Date(), "hi", false),
];

drawDisplay();
todos.forEach((todo) => {
	addTodo(todo);
});
