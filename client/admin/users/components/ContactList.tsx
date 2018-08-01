import * as React from 'react';
import {Paper, Table, TableHead, TableRow, TableCell, TableBody, Button} from '@material-ui/core';
import {Delete as DeleteIcon} from '@material-ui/icons';
import Icon from '@material-ui/core/Icon';
import {styles} from './Styles';
import {initialState} from './initialState';
import {SimpleModal} from './SimpleModal';

interface Props {
    onOpenHandler: () => void;
    handleOnClose?: () => void;
}
type State = Readonly<typeof initialState>;

export class ContactList extends React.Component<Props, State> {
    state = initialState;
    handleOnDelete = (id: number) => () => {
        this.setState({contacts: this.state.contacts.filter((e) => e.id !== id)});
    };
    render() {
        const {contacts, isOpen} = this.state;
        return (
            <>
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
                                        <Button
                                            variant="fab"
                                            color="secondary"
                                            aria-label="Edit"
                                            mini
                                            style={styles.button_edit}
                                            onClick={this.props.onOpenHandler}
                                        >
                                            <Icon>edit_icon</Icon>
                                        </Button>
                                        <Button variant="fab" aria-label="Delete" mini onClick={this.handleOnDelete(contact.id)}>
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <SimpleModal isOpen={isOpen} handleOnClose={this.props.handleOnClose} />
            </>
        );
    }
}
