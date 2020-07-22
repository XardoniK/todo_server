import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull, GraphQLBoolean
} from 'graphql';
// import Book from '../models/book';
// import Author from '../models/author';
import TodoType from "./types/todo";
import TodoModel from "../models/todo";
import TodoGroupType from "./types/todo_group";
import TodoGroupModel from "../models/todo_group";

const RootQueryType = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		todoGroupList: {
			type: new GraphQLList(TodoGroupType),
			resolve(parent, args) {
				return TodoGroupModel.find();
			}
		},
		todoList: {
			type: new GraphQLList(TodoType),
			resolve(parent, args) {
				return TodoModel.find();
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		todoAdd: {
			type: TodoType,
			args: {
				name: {type: new GraphQLNonNull(GraphQLString)},
				todoGroupID: {type: new GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args) {
				const {name, todoGroupID} = args;

				console.log(name, todoGroupID);

				const todo = new TodoModel({
					name,
					todoGroupID,
				});

				return todo.save();
			}
		},
		todoRemove: {
			type: TodoType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args) {
				const {id} = args;

				const todo = TodoModel.findByIdAndRemove(id);

				//later change {deleted} to true
				return todo;
			}
		},
		todoRemoveAll: {
			type: TodoType,
			args: {},
			resolve(parent, args) {
				return TodoModel.find({}).remove();
			},
		},
		todoGroupAdd: {
			type: TodoGroupType,
			args: {
				name: {type: new GraphQLNonNull(GraphQLString)},
				// active: {type: GraphQLBoolean},
			},
			resolve(parent, args) {
				const {name, active} = args;

				const todoGroup = new TodoGroupModel({
					name,
					// active
				});

				return todoGroup.save();
			}
		}
	}
});

const schema = new GraphQLSchema({
	query: RootQueryType,
	mutation: Mutation,
});


export default schema;
