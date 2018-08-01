import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import TextField from '../../../../node_modules/@material-ui/core/TextField';
import Button from '../../../../node_modules/@material-ui/core/Button';
import {initialState} from './initialState';
import {styles} from './Styles';
import {WithAdminProps} from '@client/with';

interface Props {
    readonly isOpen: boolean;
    readonly handleOnClose?: () => void;
    readonly id?: number;
}

type State = Readonly<typeof initialState>;

export class SimpleModal extends React.Component<Props, State> {
    state = initialState;

    handleOnChange = (e: any) => {
        this.setState({
            ...this.state,
            contacts: {
                ...this.state.contacts,
                [e.target.name]: e.target.value,
            },
        });
        // console.log(this.state.contacts);
    };

    render() {
        // const indexSearchUser = this.state.contacts.filter((contact) => contact.id !== this.props.id);
        // const indexUser = indexSearchUser.join();
        const {handleOnClose, isOpen} = this.props;
        const {contacts} = this.state;
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
                        <TextField
                            name="firstName"
                            id="name"
                            label="First Name"
                            value={contacts.firstName}
                            onChange={this.handleOnChange}
                            margin="normal"
                            required
                        />
                        <br />
                        <TextField
                            name="lastName"
                            id="name"
                            label="Last Name"
                            value={contacts.lastName}
                            onChange={this.handleOnChange}
                            margin="normal"
                            required
                        />
                        <br />
                        <TextField name="email" id="name" label="E-mail" value={contacts.email} onChange={this.handleOnChange} margin="normal" required />
                        <br />
                        <TextField
                            name="phoneNumber"
                            id="name"
                            label="Phone Number"
                            value={contacts.phoneNumber}
                            onChange={this.handleOnChange}
                            margin="normal"
                        />
                        <br />
                        <Button variant="contained" color="primary" mini>
                            Submit
                        </Button>
                        <Button variant="contained" color="default" mini onClick={handleOnClose} style={styles.button}>
                            Cancel
                        </Button>
                    </div>
                </Slide>
            </Modal>
        );
    }
}
