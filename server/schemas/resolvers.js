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
            // console.log(context.user);
            if (context.user) {
                const data = await User.findOne({ _id: context.user._id }).select('-__v');
                // console.log("post:",data);
                return data;
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

            const correctPw = await user.isCorrectPassword(password);

            if ( !correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },
        
        saveBook: async (parent, args, context) => {
            
            if (context.user) {
                console.log(context.user);
                // const book = await Book.findOne({ _id: bookId });
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: {...args} }},
                    { new: true }
                );
            }
            throw AuthenticationError;
        },

        deleteBook: async (parent, args, context) => {
            console.log('args', args);
            if (context.user) {
                // const book = await Book.findOne({ _id: bookId });
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } }},
                    { new: true }
                );
            }
            throw AuthenticationError;
        }
    }
};

module.exports = resolvers;