import * as React from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';
import cookie from 'cookie';

const checkLoggedIn = (apolloClient: any): Promise<{loggedInUser: any}> => {
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
        .then(({data}: any) => {
            return {loggedInUser: data};
        })
        .catch(() => {
            // Fail gracefully
            return {loggedInUser: {}};
        });
};

const redirect = (context: any, target: string) => {
    if (context.res) {
        // server
        // 303: "See other"
        context.res.writeHead(303, {Location: target});
        context.res.end();
    } else {
        // In the browser, we just pretend like this never even happened ;)
        Router.replace(target);
    }
};

export const withAuthAdmin = (BaseComponent: any) => {
    return class extends React.Component {
        signout = (apolloClient: any) => () => {
            document.cookie = cookie.serialize('token', '', {
                maxAge: -1, // Expire the cookie immediately
            });

            // Force a reload of all the current queries now that the user is
            // logged in, so we don't accidentally leave any state around.
            apolloClient.cache.reset().then(() => {
                // Redirect to a more useful page when signed out
                redirect({}, '/login');
            });
        };

        static async getInitialProps(context: any, _: any) {
            const {loggedInUser} = await checkLoggedIn(context.apolloClient);
            if (!loggedInUser.me) {
                // If not signed in, send them somewhere more useful
                redirect(context, '/login');
            }

            return {loggedInUser};
        }

        render() {
            return <BaseComponent {...this.props} logout={this.signout} />;
        }
    };
};
