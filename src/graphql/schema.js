import User from './UserSchema';

const RootSchema = `
type RootQuery {
  allUsers: [User]
}

type RootMutation {
  updateUser( id: String email: String firstName: String lastName: String ): User
  removeUser( id: String ): User 
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`;

export default () => [RootSchema, User];
