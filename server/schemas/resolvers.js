const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
        }
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await User.isCorrectPassword(password);

            if ( !correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },
        
        saveBook: async (parent, { userId, bookId }, context) => {
            if (context.user) {
                const book = await Book.findOne({ _id: bookId });
                const user = await User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { savedBooks: book }},
                    { new: true, runValidators: true }
                );
    
                return { user };
            }
            throw AuthenticationError;
        },

        deleteBook: async (parent, { userId, bookId }, context) => {
            if (context.user) {
                const book = await Book.findOne({ _id: bookId });
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: book }},
                    { new: true }
                );
    
                return { user };
            }
            throw AuthenticationError;
        }
    }
};

module.exports = resolvers;