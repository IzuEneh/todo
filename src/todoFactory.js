export const todoObject = (
	title,
	description,
	dueDate,
	priority,
	completed
) => {
	title = title.charAt(0).toUpperCase() + title.slice(1);
	return { title, description, dueDate, priority, completed };
};
