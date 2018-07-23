import * as React from 'react';
import {ApolloClient, ApolloQueryResult} from 'apollo-boost';
import gql from 'graphql-tag';
import Router from 'next/router';
import cookie from 'cookie';
import {Account, Query} from '@graphql-model';
import {DocumentProps, NextDocumentContext} from 'next/document';

interface LoggedInUserResponse {
    readonly loggedInUser: Pick<Account, 'id' | 'firstName' | 'lastName'>;
}

const checkLoggedIn = (apolloClient: ApolloClient<any>): Promise<Partial<LoggedInUserResponse>> => {
    return apolloClient
        .query({
            query: gql`
                query getUser {
                    me {
                        id
                        firstName
                        lastName
                    }
                }
            `,
        })
        .then(({data}: ApolloQueryResult<Query>) => {
            if (!data || !data.me) {
                throw new Error('User is not logged');
            }
            return {loggedInUser: data.me};
        })
        .catch(() => {
            // Fail gracefully
            return {loggedInUser: undefined};
        });
};

const redirect = async (target: string, context?: NextDocumentContext): Promise<boolean> => {
    if (context && context.res) {
        context.res.writeHead(303, {Location: target});
        context.res.end();
        return true;
    } else {
        return await Router.replace(target);
    }
};

export interface WithAuthAdminProps extends LoggedInUserResponse {
    readonly logout: (client: ApolloClient<any>) => () => Promise<void>;
}

export const withAuthAdmin = (BaseComponent: React.ComponentType<WithAuthAdminProps> & {getInitialProps?(ctx: NextDocumentContext): DocumentProps}) => {
    return class extends React.Component<LoggedInUserResponse> {
        handleOnLogout = (apolloClient: ApolloClient<any>) => async () => {
            document.cookie = cookie.serialize('token', '', {
                maxAge: -1, // Expire the cookie immediately
            });
            await apolloClient.cache.reset();
            await redirect('/login');
        };

        static async getInitialProps(context: NextDocumentContext & {apolloClient: ApolloClient<any>}) {
            const {loggedInUser} = await checkLoggedIn(context.apolloClient);
            if (!loggedInUser) {
                // If not signed in, send them somewhere more useful
                await redirect('/login', context);
            }
            const props = BaseComponent.getInitialProps ? await BaseComponent.getInitialProps(context) : {};
            return {...props, loggedInUser};
        }

        render() {
            return <BaseComponent {...this.props} logout={this.handleOnLogout} />;
        }
    };
};
