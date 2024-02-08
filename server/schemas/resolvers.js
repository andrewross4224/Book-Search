const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).select('-password -__v')
        return user;
      }

      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, args, context) => {
      const user = await User.create(args)
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, args, context) => {
      const user = await User.findOne(args.email);
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(args.password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: args.book } },
          { new: true });

        return user;
      }
      throw AuthenticationError;
    },
    removeBook: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: args.bookId } },
          { new: true });

        return user;
      }
      throw AuthenticationError;
    }

  }
}

module.exports = resolvers;

