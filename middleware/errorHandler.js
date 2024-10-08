const AppError = require('../utils/appError');

const handleCastError = (err) => {
	const message = `Invalid ${err.path}: ${err.value}`;

	return new AppError(message, 400);
};

const handleValidationError = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);
	const message = errors.join(' ');

	return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		console.error(err);

		res.status(500).json({
			status: 'error',
			message: 'Something went wrong!',
		});
	}
};

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(err, res);
	} else if (process.env.NODE_ENV === 'production') {
		let error = { ...err };
		error.message = err.message;
		error.name = err.name;

		if (error.name === 'CastError') error = handleCastError(error);
		if (error.name === 'ValidationError')
			error = handleValidationError(error);

		sendErrorProd(error, res);
	}
};
