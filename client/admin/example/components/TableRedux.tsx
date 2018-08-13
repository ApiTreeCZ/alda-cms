import * as React from 'react';
import {LinearProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {connect} from 'react-redux';
import {Store} from '@client/Store';
import {ExampleStore} from '@client/admin/example/store';

interface OwnProps {}

interface ConnectedState {
    readonly example: ExampleStore;
}

type Props = ConnectedState & OwnProps;

class Component extends React.Component<Props> {
    render() {
        const {
            example: {table, tableBackgroundColor},
        } = this.props;
        return (
            <Paper>
                {table.isFetching && <LinearProgress />}
                <Table style={{backgroundColor: tableBackgroundColor}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>First name</TableCell>
                            <TableCell>Last name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table.data &&
                            table.data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.firstName}</TableCell>
                                    <TableCell>{row.lastName}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export const TableRedux = connect<ConnectedState, {}, OwnProps, any>(({example}: Store) => ({example}))(Component);
