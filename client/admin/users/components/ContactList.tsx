import * as React from 'react';
import {Delete as DeleteIcon} from '@material-ui/icons';
import Icon from '@material-ui/core/Icon';
import {Paper, Table, TableHead, TableRow, TableCell, TableBody, Button} from '@material-ui/core';
import {styles} from './Styles';
import {ContactModel} from './initialState';

interface Props {
    contacts: ContactModel[];
    deleteContact: (id: number) => () => void;
    handleOnId: (id: number) => () => void;
}

export const ContactList: React.SFC<Props> = ({contacts, deleteContact, handleOnId}) => (
    <Paper style={styles.paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>E-mail</TableCell>
                    <TableCell>Phone number</TableCell>
                    <TableCell />
                </TableRow>
            </TableHead>
            <TableBody>
                {contacts.map((contact: ContactModel) => (
                    <TableRow key={contact.id}>
                        <TableCell>{contact.firstName}</TableCell>
                        <TableCell>{contact.lastName}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phoneNumber}</TableCell>
                        <TableCell>
                            <Button variant="fab" color="secondary" aria-label="Edit" mini style={styles.button_edit} onClick={handleOnId(contact.id)}>
                                <Icon>edit_icon</Icon>
                            </Button>
                            <Button variant="fab" aria-label="Delete" mini onClick={deleteContact(contact.id)}>
                                <DeleteIcon />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>
);
