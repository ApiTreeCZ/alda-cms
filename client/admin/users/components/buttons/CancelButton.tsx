import * as React from 'react';
import {Button, withStyles} from '@material-ui/core';

interface Props {
    handleOnClose: () => void;
}

const decorate = withStyles(() => ({
    button: {
        margin: '10px',
    },
}));

export const CancelButton = decorate<Props>(({classes, handleOnClose}) => {
    return (
        <Button variant="contained" color="default" mini onClick={handleOnClose} className={classes.button}>
            Cancel
        </Button>
    );
});
