const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/sendEmail');
const createSendToken = require('../utils/createSendToken');

exports.register = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		passwordChangedAt: req.body.passwordChangedAt,
	});

	createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new AppError('Please provide email and password.', 400));
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user || !(await user.comparePasswords(password, user.password))) {
		return next(new AppError('Incorrect email or password.', 401));
	}

	createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
	const cookieOptions = {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
		SameSite: 'none',
	};

	res.cookie('jwt', 'loggedOut', cookieOptions);

	res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}
	if (!token) {
		return next(
			new AppError(
				'You are not logged in. Please log in to get an access.',
				401
			)
		);
	}

	const decodedData = await promisify(jwt.verify)(
		token,
		process.env.JWT_SECRET
	);
	const currentUser = await User.findById(decodedData.id);

	if (!currentUser) {
		return next(
			new AppError(
				'The user belonging to the token no longer exists.',
				401
			)
		);
	}

	if (currentUser.changedPasswordAfter(decodedData.iat)) {
		return next(
			new AppError(
				'The password has been recently changed. Please log in again.',
				401
			)
		);
	}

	req.user = currentUser;

	next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(
			new AppError('There is no user with this email address.', 404)
		);
	}

	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	const resetURL = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/users/resetPassword/${resetToken}`;
	const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Your password reset token (valid for 10 min)',
			message,
		});

		res.status(200).json({
			status: 'success',
			message: `Token has been sent to user's email.`,
		});
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;

		await user.save({ validateBeforeSave: false });

		return next(
			new AppError(
				'There was an error sending the email. Try again later!',
				500
			)
		);
	}
});

exports.resetPassword = catchAsync(async (req, res, next) => {
	const hashedToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	if (!user) {
		return next(new AppError('Token is invalid or has expired.', 400));
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;

	await user.save();

	createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	if (
		!(await user.comparePasswords(req.body.passwordCurrent, user.password))
	) {
		return next(new AppError('Your current password is wrong.', 401));
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;

	await user.save();

	createSendToken(user, 200, res);
});
