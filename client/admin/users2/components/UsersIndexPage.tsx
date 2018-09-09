import * as React from 'react';
import {WithAdminProps} from '@client/with/withAdmin';
import {Button, Grid, Typography} from '@material-ui/core';
import {UsersTable} from './UsersTable';
import {CreateUserDialog} from './CreateUserDialog';
import {User} from '@graphql-model';
import {UpdateUserDialog} from './UpdateUserDialog';

interface State {
    isOpenCreateDialog: boolean;
    editUser?: User;
    isOpenUpdateDialog: boolean;
}

export class UsersIndexPage extends React.Component<WithAdminProps, State> {
    readonly state = {isOpenCreateDialog: false, isOpenUpdateDialog: false, editUser: undefined};

    handleOpenCreateDialog = () => {
        this.setState({isOpenCreateDialog: true});
    };

    handleCloseCreateDialog = () => {
        this.setState({isOpenCreateDialog: false});
    };

    handleClickEdit = (user: User) => {
        this.setState({isOpenUpdateDialog: true, editUser: user});
    };

    handleCloseUpdateDialog = () => {
        this.setState({isOpenUpdateDialog: false});
    };

    render() {
        const {isOpenCreateDialog, isOpenUpdateDialog, editUser} = this.state;
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="title">Users</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={this.handleOpenCreateDialog}>Create</Button>
                </Grid>
                <Grid item xs={12}>
                    <UsersTable onClickEdit={this.handleClickEdit} />
                    {isOpenCreateDialog && <CreateUserDialog open={true} onClose={this.handleCloseCreateDialog} />}
                    {isOpenUpdateDialog && <UpdateUserDialog open={true} user={editUser!} onClose={this.handleCloseUpdateDialog} />}
                </Grid>
            </Grid>
        );
    }
}
