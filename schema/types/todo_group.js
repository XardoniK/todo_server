import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList, GraphQLBoolean,
} from 'graphql';
import TodoType from "./todo";
import TodoModel from "../../models/todo";

const TodoGroupType = new GraphQLObjectType({
	name: 'TodoGroup',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		sort: {type: GraphQLInt},
		active: {type: GraphQLBoolean},
		todos: {
			type: GraphQLList(TodoType),
			resolve(parent, args) {
				return TodoModel.find({todoGroupID: parent.id});
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
