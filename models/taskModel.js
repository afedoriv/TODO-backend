const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	description: {
		type: String,
		required: [
			true,
			'A task must have a description and a minimum length (1).',
		],
		maxLength: [
			215,
			'A task description must be less than or equal to 215 characters.',
		],
		minLength: 1,
		trim: true,
	},
	category: {
		type: String,
		required: [true, 'A task must have a category.'],
		enum: {
			values: ['personal', 'business'],
			message: `A task category must be either 'personal' or 'business'.`,
		},
		lowercase: true,
		trim: true,
	},
	completed: {
		type: Boolean,
		cast: `A task completion status must be either 'true' or 'false'.`,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		select: false,
	},
});

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;
