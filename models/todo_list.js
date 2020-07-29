const mongoose = require('mongoose');

const TodoListModel = mongoose.model('TodoList', {
	name: String,
	active: {type: Boolean, default: true},
	todoGroupID: String,
});

export default TodoListModel;
