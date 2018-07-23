import * as React from 'react';
import {NextDocumentContext} from 'next/document';
import Head from 'next/head';
import {getDataFromTree} from 'react-apollo';
import * as cookie from 'cookie';
import {initApollo} from './initApollo';

declare const process: any;

const parseCookies = (req?: any, options = {}) => cookie.parse(req ? req.headers.cookie || '' : document.cookie, options);

type AppType = React.ComponentClass<any> & {getInitialProps?: (ctx: NextDocumentContext) => any};

export const withApollo = (App: AppType): React.ComponentClass<any> => {
    return class PageWithApollo extends React.Component<any> {
        private apolloClient: any;

        static async getInitialProps(ctx: any) {
            const {
                Component,
                router,
                ctx: {req, res},
            } = ctx;

            const apollo = initApollo({}, {getToken: () => parseCookies(req).token}, req);

            ctx.ctx.apolloClient = apollo;

            let appProps = {};
            if (App.getInitialProps) {
                appProps = await App.getInitialProps(ctx);
            }

            if (res && res.finished) {
                // When redirecting, the response is finished.
                // No point in continuing to render
                return {};
            }

            // Run all graphql queries in the component tree
            // and extract the resulting data
            try {
                // Run all GraphQL queries
                await getDataFromTree(<App {...appProps} Component={Component} router={router} apolloClient={apollo} />);
            } catch (error) {
                // Prevent Apollo Client GraphQL errors from crashing SSR.
                // Handle them in components via the data.error prop:
                // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
                // console.error('Error while running `getDataFromTree`', error);
            }

            if (!process.browser) {
                // getDataFromTree does not call componentWillUnmount
                // head side effect therefore need to be cleared manually
                Head.rewind();
            }

            // Extract query data from the Apollo's store
            const apolloState = apollo.cache.extract();

            return {
                ...appProps,
                apolloState,
            };
        }

        constructor(props: any) {
            super(props);
            // `getDataFromTree` renders the component first, the client is passed off as a property.
            // After that rendering is done using Next's normal rendering pipeline
            this.apolloClient = initApollo(props.apolloState, {
                getToken: () => parseCookies().token,
            });
        }

        render() {
            return <App {...this.props} apolloClient={this.apolloClient} />;
        }
    };
};
