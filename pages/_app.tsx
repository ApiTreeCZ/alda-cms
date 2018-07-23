import Router from 'next/router';
import * as NProgress from 'nprogress';
import * as React from 'react';
import {ApolloProvider, compose} from 'react-apollo';

import {withApollo, withIntl, withMaterialUi} from '../client/with';

NProgress.configure({parent: '#loadingContent'});

Router.onRouteChangeStart = (_) => {
    NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

// tslint:disable-next-line
const {Container, default: App} = require('next/app');

class AldaApp extends App {
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
