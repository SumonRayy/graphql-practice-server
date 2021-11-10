const graphql = require('graphql');
const {
    GraphQLObjectType, 
    GraphQLSchema,
    GraphQLInt, 
    GraphQLString,
    GraphQLList,
    } = graphql;
const userData = require('../data/simpleUserData.json');
const UserType = require('./typeDefs/UserType')

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: {
                id: {type: GraphQLInt}
            },
            resolve(parentValue, args) {
                return userData;
            }
        },
        getUserById: {
            type: UserType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve(parentValue, args) {
                return userData.find(user => user.id == args.id);
            }
        }
    }
});


const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                first_name: {type: GraphQLString},
                last_name: {type: GraphQLString},
                email: {type: GraphQLString},
                gender: {type: GraphQLString},
                password: {type: GraphQLString},
            },
            resolve(parentValue, args) {
                userData.push({ 
                    id: userData.length + 1 , 
                    first_name: args.first_name, 
                    last_name: args.last_name,
                    email: args.email,
                    gender: args.gender,
                    password: args.password,
                })
                return args
            }
        }
    }
}); 


module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutations});