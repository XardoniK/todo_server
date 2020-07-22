import mongoose from 'mongoose';

const TodoModel = mongoose.model('Todo', {
	name: String,
	active: Boolean,
	userID: String,
	todoGroupID: String,
});

export default TodoModel;
