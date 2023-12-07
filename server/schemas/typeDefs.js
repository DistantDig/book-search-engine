//Add Auth type and login mutation
const typeDefs = `
    type Book {
        _id: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Query {
        users: [User]
        user(userId: ID!): User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        saveBook(userId: ID!, book: String!): User
        deleteBook(userId: ID!, book: String!): User
    }
`;

module.exports = typeDefs;