import Boom from 'boom';

const resolvers = models => ({
  RootQuery: {
    allUsers() {
      return models.user
        .find()
        .then(user => user)
        .catch(error => Boom.badImplementation(error));
    },
  },
  RootMutation: {
    updateUser(root, args) {
      return models.user
        .findOneAndUpdate(args.id, args, { new: true })
        .then(user => user)
        .catch(err => Boom.badImplementation(err));
    },
    removeUser(root, args) {
      return models.user
        .delete({ _id: args.id })
        .then(() => null)
        .catch(err => Boom.badImplementation(err));
    },
  },
});

export default resolvers;
