// Import required packages
const express = require('express');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
//const fetch = require('node-fetch');

require('dotenv').config();

const app = express();

const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASS = process.env.USER_PASS;

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
	service: 'gmail', // Use your email service provider
	auth: {
		user: USER_EMAIL, // Your email address
		pass: USER_PASS, // Your email password (or app password)
	},
});

// Email sending function
const sendEmail = () => {
	console.log(USER_EMAIL);
	const mailOptions = {
		from: USER_EMAIL,
		to: 'rainakalhan90@gmail.com',
		subject: 'Weekly Reminder',
		text: 'This is your weekly reminder email.',
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Email sent: ' + info.response);
	});
};

// Schedule the email to be sent every Monday at 12 PM
cron.schedule('*/1 * * * *', () => {
	console.log('Sending weekly reminder email...');
	sendEmail();
});

// Set up a keep-alive endpoint
app.get('/keep-alive', (req, res) => {
	res.send('Keeping the server alive');
});

// Set up a basic route
app.get('/', (req, res) => {
	res.send('Email scheduling server is running.');
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);

	setInterval(() => {
		console.log('Server is still active at:', new Date());
	}, 5 * 60 * 1000); // Log every 5 minutes
});

//Ping the keep-alive endpoint periodically to keep the server active
// setInterval(() => {
// 	fetch(`http://localhost:${port}/keep-alive`)
// 		.then((res) => res.text())
// 		.then((body) => console.log(body))
// 		.catch((err) => console.error(err));
// }, 5 * 60 * 1000); // Ping every 5 minutes
