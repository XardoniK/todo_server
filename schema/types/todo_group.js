import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList, GraphQLBoolean,
} from 'graphql';
import TodoItemType from "./todo_item";
import TodoItemModel from "../../models/todo_item";
import TodoListType from "./todo_list";
import TodoListModel from "../../models/todo_list";

const TodoGroupType = new GraphQLObjectType({
	name: 'TodoGroup',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		sort: {type: GraphQLInt},
		active: {type: GraphQLBoolean},
		todoLists: {
			type: GraphQLList(TodoListType),
			resolve(parent, args) {
				return TodoListModel.find({todoGroupID: parent.id});
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

export default TodoGroupType;
