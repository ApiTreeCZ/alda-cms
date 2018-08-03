import * as React from 'react';
import {WithAdminProps} from '@client/with/withAdmin';
import {Add} from '@material-ui/icons';
import {Button} from '@material-ui/core';
import {styles} from './Styles';
import {SimpleModal} from './SimpleModal';
import {ContactList} from './ContactList';
import {initialState} from './initialState';

export class UsersIndexPage extends React.Component<WithAdminProps> {
    state = initialState;

    componentDidUpdate() {
        return true;
    }

    handleOnOpen = () => {
        this.setState({isOpen: true});
    };

    handleOnClose = () => {
        this.setState({isOpen: false, contact: ''});
    };

    handleOnDelete = (id: number) => () => {
        const contacts = [...this.state.contacts.filter((contact) => contact.id !== id)];
        this.setState({contacts, contact: ''});
    };

    handleOnId = (id: number) => () => {
        this.setState({id, isOpen: true});
        const user = this.state.contacts.filter((contact) => contact.id === id).find((contact) => contact.id === id);
        this.setState({contact: user});
    };

    handleOnChange = (e: any) => {
        this.setState({
            contact: {...this.state.contact, [e.target.name]: e.target.value},
        });
    };

    handleOnSave = () => {
        const userId = new Date().getMilliseconds();
        const {contact, id} = this.state;
        const contactsMap = this.state.contacts.map((user) => (user.id === id ? {...user, ...contact} : user));
        const contactFilter = contactsMap.filter((contacts) => contacts);
        if (id > 0) {
            this.setState({
                contacts: contactFilter,
                isOpen: false,
                contact: '',
            });
        }
        if (id === 0) {
            this.setState({contacts: [...this.state.contacts, {...contact, id: userId}], isOpen: false, contact: ''});
        }
    };

    render() {
        const {contacts, isOpen, contact} = this.state;
        return (
            <>
                <Button variant="fab" color="primary" aria-label="Add" mini style={styles.button} onClick={this.handleOnOpen}>
                    <Add />
                </Button>
                <ContactList contacts={contacts} deleteContact={this.handleOnDelete} handleOnId={this.handleOnId} />
                <SimpleModal
                    isOpen={isOpen}
                    handleOnClose={this.handleOnClose}
                    contact={contact}
                    handleOnChange={this.handleOnChange}
                    handleOnSave={this.handleOnSave}
                />
            </>
        );
    }
}
