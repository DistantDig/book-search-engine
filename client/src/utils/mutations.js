import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($userId: ID!, $bookId: String!) {
        saveBook(userId: $userId, bookId: $bookId) {
            _id
            username
            savedBooks
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation deleteBook($userId: ID!, $bookId: bookId!) {
        deleteBook(userId: $userId, bookId: $bookId) {
            _id
            username
            savedBooks
        }
    }
`;