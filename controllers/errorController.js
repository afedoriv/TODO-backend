const AppError = require('../utils/appError');

const handleCastError = (err) => {
	const message = `Invalid ${err.path}: ${err.value}`;

	return new AppError(message, 400);
};

const handleDuplicateFields = (err) => {
	const value = Object.values(err.keyValue)[0];
	const message = `Duplicate field value: ${value}. Please use another value.`;
	return new AppError(message, 400);
};

const handleValidationError = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);
	const message = errors.join(' ');

	return new AppError(message, 400);
};

const handleJWTError = () =>
	new AppError('Invalid token. Please log in again.', 401);

const handleJWTExpiredError = () =>
	new AppError('Your token has expired. Please log in again.', 401);

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
		if (error.code === 11000) error = handleDuplicateFields(error);
		if (error.name === 'ValidationError')
			error = handleValidationError(error);
		if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
		if (error.name === 'TokenExpiredError')
			error = handleJWTExpiredError(error);

		sendErrorProd(error, res);
	}
};
