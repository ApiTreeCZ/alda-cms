import * as React from 'react';
import Icon from '@material-ui/core/Icon';
import {Button, withStyles} from '@material-ui/core';
import {ContactModel} from '@client/admin/users/components/model';

interface Props {
    contact: ContactModel;
    handleOnUserId: (id: number) => () => void;
}

const decorate = withStyles(() => ({
    button_edit: {
        margin: '10px',
    },
}));

export const EditButton = decorate<Props>(({classes, handleOnUserId, contact}) => {
    return (
        <Button variant="fab" color="secondary" aria-label="Edit" mini className={classes.button_edit} onClick={handleOnUserId(contact.id)}>
            <Icon>edit_icon</Icon>
        </Button>
    );
});
