import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        password
      }
    }
  }`

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`

export const SAVE_BOOK = gql`
mutation Mutation($book: BookInput) {
    saveBook(book: $book) {
      authors
      bookId
      description
      image
      link
      title
    }
  }
`

export const REMOVE_BOOK = gql`
mutation Mutation($bookId: ID!) {
    removeBook(bookId: $bookId) {
      bookId
    }
  }
`