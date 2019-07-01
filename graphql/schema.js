//schema.js
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} = require("graphql");
const queryObj = new GraphQLObjectType({
  name: "myFirstQuery",
  description: "a hello world demo",
  fields: {
    hello: {
      name: "a hello world query",
      description: "a hello world demo",
      type: GraphQLString,
      args: {
        name: {
          type: GraphQLString,
          defaultValue: "xiaoming"
        }
      },
      resolve(parentValue, args, request) {
        return `hello world ! ${args.name} !`;
      }
    },
    person: {
      name: "personQuery",
      description: "query a person",
      type: new GraphQLObjectType({
        name: "person",
        description: "person",
        fields: {
          name: {
            type: GraphQLString
          },
          age: {
            type: GraphQLInt
          },
          sex: {
            type: GraphQLBoolean
          }
        }
      }),
      args: {
        name: {
          type: GraphQLString,
          defalutValue: "daming"
        }
      },
      resolve(parentValue, args, request) {
        return {
          name: args.name,
          age: args.name.length,
          sex: Math.random() > 0.5
        };
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: queryObj
});
