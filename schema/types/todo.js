import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,

	GraphQLBoolean,
} from 'graphql';
import TodoGroupType from "./todo_group";
import TodoGroupModel from "../../models/todo_group";

const TodoType = new GraphQLObjectType({
	name: 'Todo',
	fields: () => ({
		id: {type: GraphQLID},
		// hash: {type: GraphQLString},
		name: {type: GraphQLString},
		active: {type: GraphQLBoolean, },
		sort: {type: GraphQLInt},
		todoGroupID: {type: GraphQLID},
		todoGroup: {
			type: TodoGroupType,
			resolve(parent, args) {
				return TodoGroupModel.findById(parent.todoGroupID);
			}
		},
	}),
});



export default TodoType;
