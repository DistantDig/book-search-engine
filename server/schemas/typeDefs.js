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

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(userId: ID!): User
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(userId: ID!, bookId: String!): User
        deleteBook(userId: ID!, bookId: String!): User
    }
`;

module.exports = typeDefs;