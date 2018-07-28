import * as React from 'react';
import * as NProgress from 'nprogress';
import {ApolloProvider, compose} from 'react-apollo';

import {withApollo, withIntl, withMaterialUi} from '../client/with';

NProgress.configure({parent: '#loadingContent'});

// tslint:disable-next-line
const {Container, default: App} = require('next/app');

class AldaApp extends App {
    static async getInitialProps({Component, ctx}: any) {
        return {
            pageProps: {
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
            },
        };
    }

    render() {
        const {Component, pageProps, apolloClient} = this.props;
        return (
            <ApolloProvider client={apolloClient}>
                <Container>
                    <Component {...pageProps} />
                </Container>
            </ApolloProvider>
        );
    }
}

export default compose(
    withApollo,
    withIntl,
    withMaterialUi,
)(AldaApp);
