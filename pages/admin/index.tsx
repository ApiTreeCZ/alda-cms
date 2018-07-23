import * as React from 'react';
import {ApolloConsumer} from 'react-apollo';
import {withAuthAdmin} from '../../client/with';

class Page extends React.Component<any> {
    render() {
        const {logout} = this.props;
        return (
            <ApolloConsumer>
                {(client) => (
                    <div>
                        Hello {this.props.loggedInUser.me.firstName}!<br />
                        <button onClick={logout(client)}>Sign out</button>
                    </div>
                )}
            </ApolloConsumer>
        );
    }
}

export default withAuthAdmin(Page);
