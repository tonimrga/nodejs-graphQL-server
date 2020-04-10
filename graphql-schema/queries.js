const graphql = require('graphql');
const fetch = require("node-fetch");
const { GraphQLObjectType, GraphQLList, GraphQLInt } = graphql;

const { apiUrl } = require('../config');
const { PostType, UserType } = require('./types');

const query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        user: {
            type: UserType,
            args: { id: {type: GraphQLInt} },
            async resolve(parentValue, args) {
                try {
                    const response = await fetch(`${apiUrl}/users/${args.id}`);
                    return response.json();
                } catch(e) {
                    console.error(e);
                }
            }
        },
        users: {
            type: new GraphQLList(UserType),
            async resolve() {
                try {
                    const response = await fetch(`${apiUrl}/users`);
                    return response.json();
                } catch(e) {
                    console.error(e);
                }
            }
        },
        post: {
            type: PostType,
            args: { id: {type: GraphQLInt} },
            async resolve(parentValue, args) {
                try {
                    const response = await fetch(`${apiUrl}/posts/${args.id}`);
                    return response.json();
                } catch(e) {
                    console.error(e);
                }
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            async resolve() {
                try {
                    const response = await fetch(`${apiUrl}/posts`);
                    return response.json();
                } catch(e) {
                    console.error(e);
                }
            }
        },
    })
});

module.exports = query;