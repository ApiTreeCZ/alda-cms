import * as React from 'react';
import {Delete as DeleteIcon} from '@material-ui/icons';
import {Button, withStyles} from '@material-ui/core';
import {ContactModel} from '@client/admin/users/components/model';

interface Props {
    contact: ContactModel;
    deleteContact: (id: number) => () => void;
}

const decorate = withStyles(() => ({
    button_edit: {
        margin: '10px',
    },
}));

export const DeleteButton = decorate<Props>(({deleteContact, contact}) => {
    return (
        <Button variant="fab" aria-label="Delete" mini onClick={deleteContact(contact.id)}>
            <DeleteIcon />
        </Button>
    );
});
