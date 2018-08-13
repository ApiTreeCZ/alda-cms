import * as React from 'react';
import {WithAdminProps} from '@client/with/withAdmin';
import {ButtonRedux} from '@client/admin/example/components/ButtonRedux';
import {Typography} from '@material-ui/core';
import {TableGraphql} from '@client/admin/example/components/TableGraphql';
import {TableRedux} from '@client/admin/example/components/TableRedux';

export class ExampleIndexPage extends React.Component<WithAdminProps> {
    render() {
        return (
            <div>
                <Typography variant="title">ExampleIndexPage</Typography>
                <ButtonRedux />
                <TableRedux />

                <TableGraphql />
            </div>
        );
    }
}
