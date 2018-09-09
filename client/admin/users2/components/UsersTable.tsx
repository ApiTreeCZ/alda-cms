import * as React from 'react';
import {Button, LinearProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';
import {Query as ApolloQuery} from 'react-apollo';
import {Query, User} from '@graphql-model';
import {UsersQueries} from '../graphql';

class UsersQuery extends ApolloQuery<Query> {}

interface Props {
    onClickEdit: (user: User) => void;
}

const decorate = withStyles(() => ({}));

export const UsersTable = decorate<Props>(({onClickEdit}) => {
    const handleRefetch = (refetch: () => void) => () => {
        refetch();
    };

    const handleClickRow = (user: User) => () => {
        onClickEdit(user);
    };

    return (
        <Paper>
            <UsersQuery query={UsersQueries.all}>
                {({data, loading, refetch, error}) => {
                    if (error) {
                        return `Error! ${error.message}`;
                    }
                    if (loading || !data) {
                        return <LinearProgress />;
                    }
                    return (
                        <>
                            <Button onClick={handleRefetch(refetch)}>Refresh</Button>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.admin.users.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.firstName}</TableCell>
                                            <TableCell>{row.lastName}</TableCell>
                                            <TableCell>
                                                <Button onClick={handleClickRow(row)}>Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </>
                    );
                }}
            </UsersQuery>
        </Paper>
    );
});
