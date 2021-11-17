const express = require('express');
const path = require('path');
const port = 8000;

//before running the server, start database using mongod command
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

var contactList = [
	{
		name  : 'Arpan',
		phone : '1111111111'
	},
	{
		name  : 'Tony Stark',
		phone : '1234567890'
	},
	{
		name  : 'Coding Ninjas',
		phone : '12131321321'
	}
];

app.get('/', (req, res) => {
	Contact.find({}, (err, contacts) => {
		if (err) {
			console.log('Error in fetching contacts from db');
			return;
		}
		return res.render('home', {
			title        : 'Contact List',
			contact_list : contacts //contacts is an array of objects
		});
	});
});

app.post('/contacts', (req, res) => {
	const { name, phone } = req.body;
	// contactList.push({ name, phone });
	Contact.create(
		{
			name  : req.body.name,
			phone : req.body.phone
		},
		(err, newContact) => {
			if (err) {
				console.log('Error in creating a contact');
				return;
			}
			console.log('*******', newContact);
			return res.redirect('/');
		}
	);
});

app.get('/delete-contact/:id', (req, res) => {
	//get the id from the query in the parameters
	let id = req.params.id;

	//find the contact in the database with given id and delete it
	// contactList = contactList.filter((contact) => contact.phone !== phone);

	Contact.findByIdAndDelete(id, (err) => {
		if (err) {
			console.log('Error in deleting the contact');
			return;
		}
		return res.redirect('/');
	});
});

app.listen(port, function(err) {
	if (err) {
		console.log('Error in running the server', err);
	}
	console.log('Yup!My Server is running on Port', port);
});
