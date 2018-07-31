import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import TextField from '../../../../node_modules/@material-ui/core/TextField';
import Button from '../../../../node_modules/@material-ui/core/Button';

interface Props {
    readonly isOpen: boolean;
    readonly handleClose: () => void;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly phoneNumber: number;
    readonly children?: React.ReactNode;
    readonly contacts: {};
}

export const SimpleModal: React.SFC<Props> = ({firstName, lastName, email, phoneNumber, isOpen, handleClose}) => {
    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={isOpen}
                onClose={handleClose}
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
                        <TextField id="name" label="First Name" value={firstName} margin="normal" required />
                        <br />
                        <TextField id="name" label="Last Name" value={lastName} margin="normal" required />
                        <br />
                        <TextField id="name" label="E-mail" value={email} margin="normal" required />
                        <br />
                        <TextField id="name" label="Phone Number" value={phoneNumber} margin="normal" />
                        <br />
                        <Button variant="contained" color="primary" mini>
                            Primary
                        </Button>
                    </div>
                </Slide>
            </Modal>
        </div>
    );
};
