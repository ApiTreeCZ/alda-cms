import * as React from 'react';
import {Add} from '@material-ui/icons';
import {Button, withStyles} from '@material-ui/core';

interface Props {
    handleOnOpen: () => void;
}

const decorate = withStyles(() => ({
    button: {
        margin: '10px',
    },
}));

export const AddButton = decorate<Props>(({classes, handleOnOpen}) => {
    return (
        <Button className={classes.button} variant="fab" color="primary" aria-label="Add" mini onClick={handleOnOpen}>
            <Add />
        </Button>
    );
});
