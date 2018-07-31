import * as React from 'react';
import {WithAdminProps} from '@client/with/withAdmin';
import {Paper, Table, TableHead, TableRow, TableCell, TableBody, Button} from '../../../../node_modules/@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import {SimpleModal} from './modal';
const styles = {
    button: {
        margin: '10px',
    },
    paper: {
        margin: '0 10px',
    },
    button_edit: {
        margin: '0 10px 0 0',
    },
    modal: {
        position: 'absolute',
        width: '400px',
        backgroundColor: 'white',
        padding: '20px',
        top: '25',
        margin: '300px',
    },
};
const initialState = {
    contacts: [
        {
            id: 1,
            firstName: 'Petr',
            lastName: 'Novak',
            email: 'pronovaso@icloud.com',
            phoneNumber: 777123456,
        },
        {
            id: 2,
            firstName: 'Karel',
            lastName: 'Omacka',
            email: 'karel@gmail.com',
            phoneNumber: 775345234,
        },
        {
            id: 3,
            firstName: 'Martina',
            lastName: 'Leva',
            email: 'martina@seznam.cz',
            phoneNumber: 603100800,
        },
    ],
    isOpen: false,
};

export class UsersIndexPage extends React.Component<WithAdminProps, typeof initialState> {
    readonly state = initialState;

    handleOpen = () => {
        this.setState({isOpen: true});
    };

    handleClose = () => {
        this.setState({isOpen: false});
    };

    render() {
        const {contacts, isOpen} = this.state;
        return (
            <>
                <Button variant="fab" color="primary" aria-label="Add" mini style={styles.button} onClick={this.handleOpen}>
                    <AddIcon />
                </Button>
                <SimpleModal isOpen={isOpen} handleClose={this.handleClose} contacts={contacts} />
                <Paper style={styles.paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Phone number</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contacts.map((contact) => (
                                <TableRow key={contact.id}>
                                    <TableCell>{contact.firstName}</TableCell>
                                    <TableCell>{contact.lastName}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.phoneNumber}</TableCell>
                                    <TableCell>
                                        <Button variant="fab" color="secondary" aria-label="Edit" mini style={styles.button_edit}>
                                            <Icon>edit_icon</Icon>
                                        </Button>
                                        <Button variant="fab" aria-label="Delete" mini>
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </>
        );
    }
}
