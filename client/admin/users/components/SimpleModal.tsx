import * as React from 'react';
import {Button, TextField} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import {styles} from './Styles';
import {ContactModel} from './initialState';
interface Props {
    isOpen: boolean;
    handleOnClose: () => void;
    contact: ContactModel;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnSave: () => void;
}

export const SimpleModal: React.SFC<Props> = ({isOpen, handleOnClose, contact, handleOnChange, handleOnSave}) => {
    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={isOpen}
            onClose={handleOnClose}
            style={{alignItems: 'center', justifyContent: 'center'}}
        >
            <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                <div
                    style={{
                        top: '25%',
                        margin: 'auto',
                        width: '400px',
                        backgroundColor: 'white',
                        padding: '20px',
                        position: 'relative',
                    }}
                >
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
                    <Button variant="contained" color="primary" mini onClick={handleOnSave}>
                        Submit
                    </Button>
                    <Button variant="contained" color="default" mini onClick={handleOnClose} style={styles.button}>
                        Cancel
                    </Button>
                </div>
            </Slide>
        </Modal>
    );
};
