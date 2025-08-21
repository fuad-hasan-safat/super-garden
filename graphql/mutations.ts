import { gql } from 'graphql-request';

export const SIGNUP_MUTATION = gql`
  mutation Signup($createUserInput: createUserInput!) {
    createUser(createUserInput: $createUserInput) {
      email
      name
    }
  }
`;

export const LOGIN_MUTATION = gql`
mutation Signin($email: String!, $password: String!) {
  signin(email: $email, password: $password) {
    access_token
    user {
      id
      name
      email
      role
    }
  }
}
`;

export const GET_USER_BY_ID = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      name
      email
      profilePic
      address
      occupation
      birthDate
      role
    }
  }
`;

export const UPDATE_PROFILE_PIC_MUTATION = gql`
  mutation($id: String!, $file: Upload!) {
          updateUserProfilePic(id: $id, file: $file) {
            id
            profilePic
          }
        }
`;


export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    id
    name
    email
    address
    occupation
    birthDate
  }
}
`
