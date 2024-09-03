const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
	console.log(
		`Uncaught Exception! Shutting down the app due to ${err.name} (${err.message}).`
	);
	process.exit(1);
});

dotenv.config();

const app = require('./app');

const DB_LINK = process.env.DATABASE_LINK.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

mongoose.set('strictQuery', false);
mongoose
	.connect(DB_LINK)
	.then(() => console.log('Has connected to the database.'));

const PORT = process.env.port || 8080;

const server = app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});

process.on('unhandledRejection', (err) => {
	console.log(
		`Unhandled Rejection! Shutting down the app due to ${err.name} (${err.message}).`
	);
	server.close(() => process.exit(1));
});
