import mongoose from 'mongoose';

const TodoItemModel = mongoose.model('TodoItem', {
	name: String,
	checked: {type: Boolean, default: false},
	active: {type: Boolean, default: true},
	userID: String,
	todoListID: String,
});

export default TodoItemModel;
