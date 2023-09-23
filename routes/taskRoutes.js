const taskController = require('../controllers/taskController');
const { Router } = require('express');

const router = Router();

router
	.route('/')
	.get(taskController.getAllTasks)
	.post(taskController.createTask)
	.delete(taskController.deleteAllTasks);

router
	.route('/:id')
	.patch(taskController.updateTask)
	.delete(taskController.deleteTask);

router.route('/:id1&:id2').put(taskController.swapTasks);

module.exports = router;
