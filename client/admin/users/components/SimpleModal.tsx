import * as React from 'react';
import {TextField, withStyles} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import {CancelButton} from './buttons/CancelButton';
import {ContactModel} from './model';
import {SubmitButton} from './buttons/SubmitButton';

interface Props {
    isOpen: boolean;
    handleOnClose: () => void;
    contact: ContactModel;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnSave: () => void;
}

const decorate = withStyles(() => ({
    modal: {
        top: '25%',
        margin: 'auto',
        width: '400px',
        backgroundColor: 'white',
        padding: '20px',
    },
    modal_window: {
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export const SimpleModal = decorate<Props>(({classes, isOpen, handleOnClose, contact, handleOnChange, handleOnSave}) => {
    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={isOpen}
            onClose={handleOnClose}
            className={classes.modal_window}
        >
            <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                <div className={classes.modal} style={{position: 'relative'}}>
                    <Typography variant="title" id="modal-title">
                        Add new user to database
                    </Typography>
                    <TextField name="firstName" id="name" label="First Name" value={contact.firstName} onChange={handleOnChange} margin="normal" required />
                    <br />
                    <TextField name="lastName" id="name" label="Last Name" value={contact.lastName} onChange={handleOnChange} margin="normal" required />
                    <br />
                    <TextField name="email" id="name" label="E-mail" value={contact.email} onChange={handleOnChange} margin="normal" required />
                    <br />
                    <TextField name="phoneNumber" id="name" label="Phone Number" value={contact.phoneNumber} onChange={handleOnChange} margin="normal" />
                    <br />
                    <SubmitButton handleOnSave={handleOnSave} />
                    <CancelButton handleOnClose={handleOnClose} />
                </div>
            </Slide>
        </Modal>
    );
});
