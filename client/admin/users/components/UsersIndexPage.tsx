import * as React from 'react';
import {WithAdminProps} from '@client/with/withAdmin';
import {SimpleModal} from '@client/admin/users/components/SimpleModal';
import {ContactsList} from '@client/admin/users/components/ContactsList';
import {AddButton} from './buttons/AddButton';
import {ContactsStore} from '../store';
import {connect} from 'react-redux';
import {Store} from '@client/Store';
import {ContactsActionCreator, ContactsAction} from '../actions';

interface OwnProps extends WithAdminProps {}

interface ConnectedState {
    readonly contacts: ContactsStore;
}

interface ConnectedDispatch extends ContactsAction {}

type Props = ConnectedState & ConnectedDispatch & OwnProps;

class UsersPage extends React.Component<Props> {
    handleOnOpen = () => {
        this.props.isOpen();
    };

    handleOnClose = () => {
        this.props.isOpen();
        this.props.contact();
    };

    handleOnDelete = (id: number) => () => {
        this.props.deleteContact(id);
    };

    handleOnUserId = (id: number) => () => {
        this.props.id(id);
        this.props.isOpen();
        this.props.idContact(id);
    };

    handleOnChange = (e: any) => {
        this.props.handleOnChange(e);
    };

    handleOnSave = () => {
        this.props.saveContact();
    };

    render() {
        const {
            contacts: {contacts, isOpen, contact},
        } = this.props;
        return (
            <>
                <AddButton handleOnOpen={this.handleOnOpen} />
                <ContactsList contacts={contacts} deleteContact={this.handleOnDelete} handleOnUserId={this.handleOnUserId} />
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

export const UsersIndexPage = connect<ConnectedState, ConnectedDispatch, OwnProps, any>(
    ({contacts}: Store) => ({contacts}),
    ContactsActionCreator,
)(UsersPage);
