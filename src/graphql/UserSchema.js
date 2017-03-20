const User = `
type User {
  id: ID!
  email: String!
  firstName: String
  lastName: String
  phone: String
}
`;

export default () => [User];
