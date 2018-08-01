import * as React from 'react';
import {WithAdminProps} from '@client/with/withAdmin';
import {Button} from '@material-ui/core';
import {Add} from '@material-ui/icons';

import {SimpleModal} from './SimpleModal';
import {ContactList} from './ContactList';
import {initialState} from './initialState';
import {styles} from './Styles';

type State = Readonly<typeof initialState>;

export class UsersIndexPage extends React.Component<WithAdminProps, State> {
    state = initialState;
    handleOnOpen = () => {
        this.setState({isOpen: true});
    };

    handleOnClose = () => {
        this.setState({isOpen: false});
    };

    render() {
        const {isOpen} = this.state;
        return (
            <>
                <Button variant="fab" color="primary" aria-label="Add" mini style={styles.button} onClick={this.handleOnOpen}>
                    <Add />
                </Button>
                <SimpleModal isOpen={isOpen} handleOnClose={this.handleOnClose} />
                <ContactList onOpenHandler={this.handleOnOpen} />
            </>
        );
    }
}
