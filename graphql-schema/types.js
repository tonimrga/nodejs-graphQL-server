const graphql = require('graphql');
const fetch = require("node-fetch");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const { apiUrl } = require('../config');

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        user: {
            type: UserType,
            async resolve(parentValue) {
                try {
                    const response = await fetch(`${apiUrl}/users/${parentValue.id}/`);
                    return response.json();
                } catch(e) {
                    console.error(e);
                }
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        posts: {
            type: new GraphQLList(PostType),
            async resolve(parentValue) {
                try {
                    const response = await fetch(`${apiUrl}/users/${parentValue.id}/posts`);
                    return response.json();
                } catch(e) {
                    console.error(e);
                }
            }
        }
    })
});

module.exports = {
    PostType,
    UserType,
};