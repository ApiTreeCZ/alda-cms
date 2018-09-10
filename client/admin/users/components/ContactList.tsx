import * as React from 'react';
import {TableRow, TableCell} from '@material-ui/core';
import {ContactModel} from './model';
import {EditButton} from './buttons/EditButton';
import {DeleteButton} from './buttons/DeleteButton';

interface Props {
    contact: ContactModel;
    deleteContact: (id: number) => () => void;
    handleOnUserId: (id: number) => () => void;
}

export const ContactList: React.SFC<Props> = ({contact, deleteContact, handleOnUserId}) => (
    <TableRow>
        <TableCell>{contact.firstName}</TableCell>
        <TableCell>{contact.lastName}</TableCell>
        <TableCell>{contact.email}</TableCell>
        <TableCell>{contact.phoneNumber}</TableCell>
        <TableCell>
            <EditButton handleOnUserId={handleOnUserId} contact={contact} />
            <DeleteButton contact={contact} deleteContact={deleteContact} />
        </TableCell>
    </TableRow>
);
