import * as React from 'react';
import {ApolloConsumer} from 'react-apollo';
import {withAdmin, WithAuthAdminProps} from '@client/with';
import {Layout} from '@client/components';

class Page extends React.Component<WithAuthAdminProps> {
    render() {
        const {logout, loggedInUser} = this.props;
        return (
            <Layout>
                <ApolloConsumer>
                    {(client) => (
                        <div>
                            Hello {loggedInUser.firstName}!<br />
                            <button onClick={logout(client)}>Sign out</button>
                        </div>
                    )}
                </ApolloConsumer>
            </Layout>
        );
    }
}

export default withAdmin(Page);
