const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [
				true,
				'Please provide your name. It should be at least 2 characters long.',
			],
			maxLength: [
				50,
				`User's name must be less than or equal to 50 characters.`,
			],
			minLength: 2,
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Please provide your email.'],
			unique: true,
			lowercase: true,
			trim: true,
			validate: [validator.isEmail, 'Please provide a valid email.'],
		},
		password: {
			type: String,
			required: [
				true,
				'Please provide a password. It should be at least 6 characters long.',
			],
			minLength: 6,
			trim: true,
			select: false,
		},
		passwordConfirm: {
			type: String,
			required: [true, 'Please confirm your password.'],
			validate: {
				validator: function (password) {
					return password === this.password;
				},
				message: 'Passwords are not the same!',
			},
		},
		passwordChangedAt: { type: Date },
		passwordResetToken: { type: String },
		passwordResetExpires: { type: Date },
		active: {
			type: Boolean,
			default: true,
			select: false,
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual('tasks', {
	ref: 'Task',
	foreignField: 'user',
	localField: '_id',
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;

	next();
});

userSchema.pre('save', function (next) {
	if (!this.isModified('password') || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;

	next();
});

userSchema.pre(/^find/, function (next) {
	this.find({ active: { $ne: false } });

	next();
});

userSchema.methods.comparePasswords = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return JWTTimestamp < changedTimestamp;
	}

	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
