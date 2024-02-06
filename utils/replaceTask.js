module.exports = (task1, task2) => {
	const taskReplacement = {
		replaceOne: {
			filter: { _id: task1._id },
			replacement: {
				description: task2.description,
				category: task2.category,
				completed: task2.completed,
				user: task2.user,
				createdAt: task2.createdAt,
			},
		},
	};

	return taskReplacement;
};
