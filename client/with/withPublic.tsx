import * as React from 'react';
import {ApolloClient} from 'apollo-boost';
import {DocumentProps, NextDocumentContext} from 'next/document';
import {Layout} from '@client/components';

export interface WithPublicProps {}

export const withPublic = (BaseComponent: React.ComponentType<WithPublicProps> & {getInitialProps?(ctx: NextDocumentContext): DocumentProps}) => {
    return class extends React.Component<WithPublicProps> {
        static async getInitialProps(context: NextDocumentContext & {apolloClient: ApolloClient<any>}) {
            return BaseComponent.getInitialProps ? await BaseComponent.getInitialProps(context) : {};
        }

        render() {
            return (
                <Layout>
                    <BaseComponent {...this.props} />
                </Layout>
            );
        }
    };
};
