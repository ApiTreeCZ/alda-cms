import * as React from 'react';
import Router from 'next/router';
import * as NProgress from 'nprogress';
import {ApolloProvider, compose} from 'react-apollo';

import {withApollo, withIntl, withMaterialUi} from '../client/with';
import {createStore} from '@client/createStore';
import {Provider} from 'react-redux';

NProgress.configure({parent: '#loadingContent'});

// tslint:disable-next-line
const {default: withRedux} = require('next-redux-wrapper');

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

    componentDidMount(): void {
        if (Router.router) {
            Router.router.events.on('routeChangeStart', () => {
                NProgress.start();
            });
            Router.router.events.on('routeChangeComplete', () => {
                NProgress.done();
            });
            Router.router.events.on('routeChangeError', () => {
                NProgress.done();
            });
        }
    }

    componentWillUnmount(): void {
        if (Router.router) {
            Router.router.events.off('routeChangeStart', () => {
                // nothing
            });
            Router.router.events.off('routeChangeComplete', () => {
                // nothing
            });
            Router.router.events.off('routeChangeError', () => {
                // nothing
            });
        }
    }

    render() {
        const {Component, pageProps, apolloClient, store} = this.props;
        return (
            <ApolloProvider client={apolloClient}>
                <Container>
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </Container>
            </ApolloProvider>
        );
    }
}

export default withRedux(createStore)(
    compose(
        withApollo,
        withIntl,
        withMaterialUi,
    )(AldaApp),
);
