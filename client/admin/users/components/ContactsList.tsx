import * as React from 'react';
import {Paper, Table, TableHead, TableRow, TableCell, TableBody, withStyles} from '@material-ui/core';
import {ContactModel} from './model';
import {ContactList} from './ContactList';

interface Props {
    contacts: ContactModel[];
    deleteContact: (id: number) => () => void;
    handleOnUserId: (id: number) => () => void;
    nadpis?: string;
}

// type WithDataProps = Pick<Props, 'deleteContact' | 'handleOnUserId'>;

const decorate = withStyles(() => ({
    paper: {
        margin: '0 10px',
    },
}));

const ContactsListData = decorate<Props>(({nadpis, classes, contacts, deleteContact, handleOnUserId}) => (
    <Paper className={classes.paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>E-mail</TableCell>
                    <TableCell>Phone number</TableCell>
                    <TableCell>{nadpis}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {contacts.map((contact: ContactModel) => (
                    <ContactList key={contact.id} contact={contact} deleteContact={deleteContact} handleOnUserId={handleOnUserId} />
                ))}
            </TableBody>
        </Table>
    </Paper>
));

const WithDataComponent = (BaseComponent: React.ComponentType<Props>): React.ComponentClass<Props> => {
    const initialState = {
        nadpis: 'Icons',
    };
    return class extends React.Component<Props, typeof initialState> {
        readonly state = initialState;
        render() {
            const {nadpis} = this.state;
            return <BaseComponent {...this.props} nadpis={nadpis} />;
        }
    };
};

export const ContactsList = WithDataComponent(ContactsListData);
