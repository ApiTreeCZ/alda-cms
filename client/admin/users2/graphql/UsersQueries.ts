import gql from 'graphql-tag';

export const UsersQueries = {
    all: gql`
        query {
            admin {
                users {
                    id
                    firstName
                    lastName
                }
            }
        }
    `,
};
