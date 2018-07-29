import * as React from 'react';
import {WithAdminProps} from '@client/with/withAdmin';
import {Button, Paper} from '@material-ui/core';
import {RemoveCircle} from '@material-ui/icons';

interface State {
    messages: any[];
    message: string;
}

export class CommentsIndexPage extends React.Component<WithAdminProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            messages: [],
            message: 'Testing text',
        };
    }

    render() {
        return (
            <div>
                Radim's CommentsIndexPage
                <Button variant="raised">Push me</Button>
                <RemoveCircle />
                <Paper elevation={5}>
                    <p style={{padding: '20px'}}>{this.state.message}</p>
                </Paper>
            </div>
        );
    }
}
