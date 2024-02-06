const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');
const { Router } = require('express');

const router = Router();

router
	.route('/')
	.get(authController.protect, taskController.getAllTasks)
	.post(authController.protect, taskController.createTask)
	.delete(authController.protect, taskController.deleteAllTasks);

router
	.route('/:id')
	.patch(authController.protect, taskController.updateTask)
	.delete(authController.protect, taskController.deleteTask);

router
	.route('/:id1&:id2')
	.put(authController.protect, taskController.swapTasks);

module.exports = router;
