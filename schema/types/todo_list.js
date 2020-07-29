import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList, GraphQLBoolean,
} from 'graphql';
import TodoItemType from "./todo_item";
import TodoItemModel from "../../models/todo_item";

const TodoListType = new GraphQLObjectType({
	name: 'TodoList',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		sort: {type: GraphQLInt},
		active: {type: GraphQLBoolean},
		todoGroupID: {type: GraphQLID},
		todoItems: {
			type: GraphQLList(TodoItemType),
			resolve(parent, args) {
				return TodoItemModel.find({todoListID: parent.id});
			}
		}
		// items: {
		// 	type: GraphQLList(TodoType),
		// 	resolve(parent, args) {
		// 		return TodoModel.find({todoGroupID: parent.id});
		// 	}
		// }
	}),
});

export default TodoListType;
