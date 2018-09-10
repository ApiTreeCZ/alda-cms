import * as React from 'react';
import {Button, withStyles} from '@material-ui/core';

interface Props {
    handleOnSave: () => void;
}

const decorate = withStyles(() => ({
    button: {
        margin: '10px',
    },
}));

export const SubmitButton = decorate<Props>(({handleOnSave}) => {
    return (
        <Button variant="contained" color="primary" mini onClick={handleOnSave}>
            Submit
        </Button>
    );
});
