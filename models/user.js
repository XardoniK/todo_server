const mongoose = require('mongoose');

const UserModel = mongoose.model('User', {
	username: String,
	password: String,
	active: Boolean,
});

export default UserModel;
