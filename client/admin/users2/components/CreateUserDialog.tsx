import * as React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField} from '@material-ui/core';
import {UserInput} from '@graphql-model';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {UsersQueries} from '../graphql';

interface Props {
    open: boolean;
    onClose: () => void;
}

interface State {
    model: UserInput;
}

const mutation = gql`
    mutation CreateUser($input: UserInput!) {
        admin {
            createUser(input: $input) {
                id
            }
        }
    }
`;

export class CreateUserDialog extends React.Component<Props, State> {
    readonly state = {
        model: {
            firstName: '',
            lastName: '',
        },
    };

    handleChange = (name: keyof UserInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const {model} = this.state;
        this.setState({model: {...model, [name]: e.target.value}});
    };

    handleCreate = (create: (arg: any) => Promise<any>) => () => {
        create({variables: {input: this.state.model}, refetchQueries: [{query: UsersQueries.all}]}).then(() => {
            this.props.onClose();
        });
    };

    render() {
        const {open, onClose} = this.props;
        const {model} = this.state;
        return (
            <Mutation mutation={mutation}>
                {(createUser, {loading}) => {
                    return (
                        <Dialog open={open} onClose={onClose} fullWidth>
                            <DialogTitle>Create user</DialogTitle>

                            <DialogContent>
                                {loading && <LinearProgress />}
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="firstName"
                                            label="First name"
                                            value={model.firstName}
                                            onChange={this.handleChange('firstName')}
                                            disabled={loading}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="lastName"
                                            label="Last name"
                                            value={model.lastName}
                                            onChange={this.handleChange('lastName')}
                                            disabled={loading}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={onClose}>Close</Button>
                                <Button color="primary" onClick={this.handleCreate(createUser)} disabled={loading}>
                                    Create
                                </Button>
                            </DialogActions>
                        </Dialog>
                    );
                }}
            </Mutation>
        );
    }
}
