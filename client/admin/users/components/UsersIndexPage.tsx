import * as React from 'react';
import {WithAdminProps} from '@client/with/withAdmin';
import {SimpleModal} from '@client/admin/users/components/SimpleModal';
import {ContactsList} from '@client/admin/users/components/ContactsList';
import {contactsList, ContactModel} from './model';
import {AddButton} from './buttons/AddButton';

interface Props extends WithAdminProps {
    contacts: ContactModel[];
}

class UsersPage extends React.Component<Props> {
    state = {
        contacts: this.props.contacts as ContactModel[],
        isOpen: false,
        contact: {} as ContactModel,
        id: 0,
    };

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

    handleOnUserId = (id: number) => () => {
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
        const {isOpen, contact, contacts} = this.state;
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

const WithDataComponent = (BaseComponent: React.ComponentType<Props>): any => {
    const initialState = {
        contacts: contactsList,
    };
    return (props: any) => <BaseComponent {...props} contacts={initialState.contacts} />;
};

export const UsersIndexPage = WithDataComponent(UsersPage);
