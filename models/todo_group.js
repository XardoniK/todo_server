const mongoose = require('mongoose');

const TodoGroupModel = mongoose.model('TodoGroup', {
	name: String,
	active: {type: Boolean, default: true},
	// usersID: [Number]
});

export default TodoGroupModel;
