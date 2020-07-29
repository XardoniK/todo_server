import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
} from 'graphql';

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: {type: GraphQLID},
		username: {type: GraphQLString},
		// password: {type: GraphQLString},
		active: {type: GraphQLBoolean},
	}),
});

export default UserType;
