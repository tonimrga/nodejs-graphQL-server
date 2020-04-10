const graphql = require('graphql');
const fetch = require("node-fetch");
const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } = graphql;

const { apiUrl } = require('../config');
const { PostType, UserType } = require('./types');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parentValue, args) {
                const response = await fetch(`${apiUrl}/users`, {
                    method: 'POST',
                    body: JSON.stringify(args),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
                return response.json();
            }
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                name: { type: GraphQLString },
                username: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            async resolve(parentValue, args) {
                const response = await fetch(`${apiUrl}/users/${args.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(args),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
                return response.json();
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            async resolve(parentValue, args) {
                const response = await fetch(`${apiUrl}/users/${args.id}`, {
                    method: 'DELETE'
                });
                return response.json();
            }
        },
        addPost: {
            type: PostType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                body: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLInt) },
            },
            async resolve(parentValue, args) {
                const response = await fetch(`${apiUrl}/posts`, {
                    method: 'POST',
                    body: JSON.stringify(args),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
                return response.json();
            }
        },
        editPost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                title: { type: GraphQLString },
                body: { type: GraphQLString },
                userId: { type: GraphQLInt }
            },
            async resolve(parentValue, args) {
                const response = await fetch(`${apiUrl}/posts/${args.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(args),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
                return response.json();
            }
        },
        deletePost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            async resolve(parentValue, args) {
                const response = await fetch(`${apiUrl}/posts/${args.id}`, {
                    method: 'DELETE'
                });
                return response.json();
            }
        },
    }
});

module.exports = mutation;