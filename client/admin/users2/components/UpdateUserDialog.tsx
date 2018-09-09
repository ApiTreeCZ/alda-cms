import * as React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField} from '@material-ui/core';
import {User, UserInput} from '@graphql-model';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {UsersQueries} from '../graphql';

interface Props {
    user: User;
    open: boolean;
    onClose: () => void;
}

interface State {
    model: UserInput;
}

const mutation = gql`
    mutation UpdateUser($id: ID!, $input: UserInput!) {
        admin {
            updateUser(id: $id, input: $input) {
                id
            }
        }
    }
`;

export class UpdateUserDialog extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);
        const {
            user: {id, __typename, ...user},
        } = props as any;
        this.state = {model: user};
    }

    handleChange = (name: keyof UserInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const {model} = this.state;
        this.setState({model: {...model, [name]: e.target.value}});
    };

    handleUpdate = (update: (arg: any) => Promise<any>) => () => {
        const {
            user: {id},
        } = this.props;
        const {model} = this.state;
        update({variables: {id, input: model}, refetchQueries: [{query: UsersQueries.all}]}).then(() => {
            this.props.onClose();
        });
    };

    render() {
        const {open, onClose} = this.props;
        const {model} = this.state;
        return (
            <Mutation mutation={mutation}>
                {(updateUser, {loading}) => {
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
                                <Button color="primary" onClick={this.handleUpdate(updateUser)} disabled={loading}>
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>
                    );
                }}
            </Mutation>
        );
    }
}
