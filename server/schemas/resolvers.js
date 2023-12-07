const { User } = require('../models');

const resolvers = {
    Query: {
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        }
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            //const token

            return { user };
        },

        saveBook: async (parent, { userId, book }) => {
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { savedBooks: book }},
                { new: true, runValidators: true }
            );

            return { user };
        },

        deleteBook: async (parent, { userId, book }, context) => {
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: book }},
                { new: true }
            );

            return { user };
        }
    }
};

module.exports = resolvers;