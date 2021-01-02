const { ApolloServer } = require("apollo-server");
const graphql = require("graphql-tag");
const mongoose = require("mongoose");

const Post = require("./models/Post");
const { MONGODB } = require("./config.js");

const PORT = process.env.port || 5000;


const typeDefs = graphql`

    type Post{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type Query{
        getPosts: [Post]
    }
`

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            }
            catch(err) {
                throw new Error(err);
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })