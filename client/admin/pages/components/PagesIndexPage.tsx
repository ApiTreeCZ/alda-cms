import * as React from 'react';
import {WithAdminProps} from '@client/with/withAdmin';
import {Button, Paper, Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core';

enum PageFormat {
    Text,
    Html,
    Markdown,
}

// data related to each page
interface PageModel {
    id: number;
    title: string;
    text: string;
    format: PageFormat;
    active: boolean;
    publishDate?: Date; // can be null
}

interface State {
    pages: PageModel[];
    showAddDialog: boolean;
    showEditDialog: boolean;
    showDeleteDialog: boolean;
    currentID: number;
}

const defaultState = {
    pages: [
        {
            id: 1,
            title: 'Home',
            text: 'This is your home page',
            format: PageFormat.Text,
            active: true,
            publishDate: new Date(2018, 12, 24),
        },
        {
            id: 2,
            title: 'About',
            text: 'This is your <b>about page</b>',
            format: PageFormat.Html,
            active: true,
        },
        {
            id: 3,
            title: 'Markdown example',
            text: 'This is your **markdown** example page',
            format: PageFormat.Markdown,
            active: true,
        },
        {
            id: 4,
            title: 'Multiline',
            text: 'This is your page\nwith several\nlines.',
            format: PageFormat.Text,
            active: true,
        },
        {
            id: 5,
            title: 'Temp',
            text: 'This is your temp page',
            format: PageFormat.Text,
            active: false,
        },
        {
            id: 6,
            title: 'Temp',
            text: 'This is your temp page',
            format: PageFormat.Text,
            active: false,
        },
        {
            id: 7,
            title: 'Temp',
            text: 'This is your temp page',
            format: PageFormat.Text,
            active: false,
        },
        {
            id: 8,
            title: 'Temp',
            text: 'This is your temp page',
            format: PageFormat.Text,
            active: false,
        },
        {
            id: 9,
            title: 'Temp',
            text: 'This is your temp page',
            format: PageFormat.Text,
            active: false,
        },
        {
            id: 10,
            title: 'Temp',
            text: 'This is your temp page',
            format: PageFormat.Text,
            active: false,
        },
        {
            id: 11,
            title: 'Temp',
            text: 'This is your temp page',
            format: PageFormat.Text,
            active: false,
        },
        {
            id: 12,
            title: 'Temp',
            text: 'This is your temp page',
            format: PageFormat.Text,
            active: false,
        },
        {
            id: 13,
            title: 'Temp',
            text: 'This is your temp page',
            format: PageFormat.Text,
            active: false,
        },
        {
            id: 14,
            title: 'Temp',
            text: 'This is your temp page',
            format: PageFormat.Text,
            active: false,
        },
        {
            id: 15,
            title: 'Temp',
            text: 'This is your temp page',
            format: PageFormat.Text,
            active: false,
        },
    ],
    showAddDialog: false,
    showEditDialog: false,
    showDeleteDialog: false,
    currentID: -1,
};

export class PagesIndexPage extends React.Component<WithAdminProps, State> {
    readonly state = defaultState;

    handleOnAdd = () => {
        // alert('ADD');
        this.hideAllDialogs();
        this.setState({
            showAddDialog: true,
        });
    };

    handleOnEdit = (id: number) => () => {
        // alert(`EDIT: ${id}`);
        this.hideAllDialogs();
        this.setState({
            showEditDialog: true,
            currentID: id,
        });
    };

    handleOnDelete = (id: number) => () => {
        // alert(`DEL: ${id}`);
        this.hideAllDialogs();
        this.setState({
            showDeleteDialog: true,
            currentID: id,
        });
    };

    hideAllDialogs = () => {
        this.setState({
            showAddDialog: false,
            showEditDialog: false,
            showDeleteDialog: false,
        });
    };

    getReadablePageFormat = (format: PageFormat) => {
        switch (format) {
            case PageFormat.Text:
                return 'Text';
            case PageFormat.Html:
                return 'Html';
            case PageFormat.Markdown:
                return 'Markdown';
        }

        return '';
    };

    render() {
        const {showAddDialog, showEditDialog, showDeleteDialog, pages} = this.state;

        return (
            <div style={{padding: '1em'}}>
                <h1>Pages</h1>
                {showAddDialog && <div>ADD DIALOG</div>}
                {showEditDialog && <div>EDIT DIALOG</div>}
                {showDeleteDialog && <div>DELETE DIALOG</div>}
                <div style={{paddingBottom: '1em'}}>
                    <Button variant="raised" color="primary" onClick={this.handleOnAdd}>
                        Add
                    </Button>
                </div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Text</TableCell>
                                <TableCell>Format</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Publish Date</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pages.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.text}</TableCell>
                                    <TableCell>{this.getReadablePageFormat(row.format)}</TableCell>
                                    <TableCell>{row.active ? <span style={{color: 'green'}}>Y</span> : <span style={{color: 'red'}}>N</span>}</TableCell>
                                    <TableCell>TODO:</TableCell>
                                    <TableCell>
                                        <Button onClick={this.handleOnEdit(row.id)}>Edit</Button>
                                        <Button onClick={this.handleOnDelete(row.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

/*
                                    <TableCell>{row.publishDate !== typeof('undefined') ? row.publishDate : ''}</TableCell>
*/
