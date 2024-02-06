const Task = require('../models/taskModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const replaceTask = require('../utils/replaceTask');

exports.createTask = catchAsync(async (req, res, next) => {
	const { id } = req.user;

	const createdTask = await Task.create({
		description: req.body.description,
		category: req.body.category,
		user: id,
	});

	res.status(201).json({
		status: 'success',
		data: { task: createdTask },
	});
});

exports.updateTask = catchAsync(async (req, res, next) => {
	const { id } = req.user;

	const updatedTask = await Task.findByIdAndUpdate(
		req.params.id,
		{ ...req.body, user: id },
		{
			new: true,
			runValidators: true,
		}
	);

	if (!updatedTask)
		return next(
			new AppError(
				`No task with ID number '${req.params.id}' has been found.`,
				404
			)
		);

	res.status(200).json({
		status: 'success',
		data: { task: updatedTask },
	});
});

exports.deleteTask = catchAsync(async (req, res, next) => {
	const deletedTask = await Task.findByIdAndDelete(req.params.id);

	if (!deletedTask)
		return next(
			new AppError(
				`No task with ID number '${req.params.id}' has been found.`,
				404
			)
		);

	res.status(204).json({
		status: 'success',
		data: null,
	});
});

exports.getAllTasks = catchAsync(async (req, res, next) => {
	const { id } = req.user;

	const tasks = await Task.find({ ...req.query, user: id });

	res.status(200).json({
		status: 'success',
		results: tasks.length,
		data: { tasks },
	});
});

exports.deleteAllTasks = catchAsync(async (req, res, next) => {
	const { id } = req.user;
	const { deletedCount } = await Task.deleteMany({ ...req.query, user: id });

	res.status(200).json({
		status: 'success',
		deletedCount: deletedCount,
	});
});

exports.swapTasks = catchAsync(async (req, res, next) => {
	const tasks = await Task.find({
		$or: [{ _id: req.params.id1 }, { _id: req.params.id2 }],
	});

	if (tasks.length !== 2)
		return next(
			new AppError(
				`No task with ID number '${req.params.id1}' and/or '${req.params.id2}' have been found.`,
				404
			)
		);

	const { modifiedCount } = await Task.bulkWrite(
		[replaceTask(tasks[0], tasks[1]), replaceTask(tasks[1], tasks[0])],
		{ skipValidation: true }
	);

	res.status(200).json({
		status: 'success',
		modifiedCount: modifiedCount,
	});
});
