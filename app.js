const express = require('express');
const cors = require('cors');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const errorHandler = require('./middleware/errorHandler');
const taskRouter = require('./routes/taskRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.options('*', cors());

app.use(hpp({ whitelist: ['category', 'completed'] }));

app.use('/api/v1/tasks', taskRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Cannot find '${req.originalUrl}' on the server`, 404));
});

app.use(errorHandler);

module.exports = app;
