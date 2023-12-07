const { User } = require('../models');
//import auth

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
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

        //add login mutation
        
        saveBook: async (parent, { userId, book }, context) => {
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { savedBooks: book }},
                    { new: true, runValidators: true }
                );
    
                return { user };
            }
            //throw AuthenticationError;
        },

        deleteBook: async (parent, { userId, book }, context) => {
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: book }},
                    { new: true }
                );
    
                return { user };
            }
            //throw AuthenticationError;
        }
    }
};

module.exports = resolvers;