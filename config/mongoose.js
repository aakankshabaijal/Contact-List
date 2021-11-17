const mongoose = require('mongoose'); //require the library
mongoose.connect('mongodb://localhost/contacts_list_db'); //connect to database

const db = mongoose.connection; //acquire the connection
db.on('error', console.error.bind(console, 'Error connecting to db'));

db.once('open', () => {
	console.log('Successfully connected to Database!');
});
