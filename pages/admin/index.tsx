import * as React from 'react';
import {ApolloConsumer} from 'react-apollo';
import {withAuthAdmin, WithAuthAdminProps} from '../../client/with';

class Page extends React.Component<WithAuthAdminProps> {
    render() {
        const {logout, loggedInUser} = this.props;
        return (
            <ApolloConsumer>
                {(client) => (
                    <div>
                        Hello {loggedInUser.firstName}!<br />
                        <button onClick={logout(client)}>Sign out</button>
                    </div>
                )}
            </ApolloConsumer>
        );
    }
}

export default withAuthAdmin(Page);
