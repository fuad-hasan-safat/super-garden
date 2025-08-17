import { gql } from 'graphql-request';

export const SIGNUP_MUTATION = gql`
  mutation Signup($createUserInput: CreateUserInput!) {
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
    }
  }
`;