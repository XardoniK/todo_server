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
		checked: {type: GraphQLBoolean},
		name: {type: GraphQLString},
		active: {type: GraphQLBoolean, },
		sort: {type: GraphQLInt},
		todoGroupID: {type: GraphQLID},
	}),
});



export default TodoType;
