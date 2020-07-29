import {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
} from 'graphql';
import TodoItemType from "./types/todo_item";
import TodoItemModel from "../models/todo_item";
import TodoGroupType from "./types/todo_group";
import TodoGroupModel from "../models/todo_group";
import TodoListType from "./types/todo_list";
import TodoListModel from "../models/todo_list";

const RootQueryType = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		todoItems: {
			type: new GraphQLList(TodoItemType),
			resolve(parent, args) {
				return TodoItemModel.find({});
			}
		},
		todoLists: {
			type: new GraphQLList(TodoListType),
			resolve(parent, args) {
				return TodoListModel.find({});
			}
		},
		todoGroups: {
			type: new GraphQLList(TodoGroupType),
			resolve(parent, args) {
				return TodoGroupModel.find({});
			}
		},

	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		todoItemAdd: {
			type: TodoItemType,
			args: {
				name: {type: new GraphQLNonNull(GraphQLString)},
				todoListID: {type: new GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args) {
				const {name, todoListID} = args;

				const todo = new TodoItemModel({
					name,
					todoListID,
				});

				return todo.save();
			}
		},
		todoItemRemove: {
			type: TodoItemType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args) {
				const {id} = args;

				return TodoItemModel.findByIdAndRemove(id);
			}
		},
		todoItemSetChecked: {
			type: TodoItemType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args) {
				const {id} = args;

				const todo = TodoItemModel.findById(id, (err, todo) => {
					todo.checked = !todo.checked;

					todo.save();
				});

				return todo;
			}
		},
		todoItemRemoveAll: {
			type: TodoItemType,
			args: {},
			resolve(parent, args) {
				return TodoItemModel.find({}).remove();
			},
		},
		todoListAdd: {
			type: TodoListType,
			args: {
				name: {type: new GraphQLNonNull(GraphQLString)},
				todoGroupID: {type: GraphQLID},
			},
			resolve(parent, args) {
				const {name, todoGroupID} = args;

				const todoList = new TodoListModel({
					name,
					todoGroupID
				});

				return todoList.save();
			}
		},
		todoListRemove: {
			type: TodoListType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args) {
				const {id} = args;

				return TodoListModel.findByIdAndRemove(id);
			}
		},
		todoGroupAdd: {
			type: TodoGroupType,
			args: {
				name: {type: new GraphQLNonNull(GraphQLString)},
			},
			resolve(parent, args) {
				const {name} = args;

				const todoGroup = new TodoGroupModel({
					name,
				});

				return todoGroup.save();
			}
		},
		todoGroupRemove: {
			type: TodoGroupType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args) {
				const {id} = args;

				return TodoGroupModel.findByIdAndRemove(id);
			}
		},
		clearDB: {
			type: TodoGroupType,
			args: {},
			resolve(parent, args) {
				console.log('inside');
				TodoListModel.remove();
				TodoItemModel.remove();
				TodoGroupModel.remove();

				console.log(TodoGroupModel.find());
			}
		}
	}
});

const schema = new GraphQLSchema({
	query: RootQueryType,
	mutation: Mutation,
});


export default schema;
