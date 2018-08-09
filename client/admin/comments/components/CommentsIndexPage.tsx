import {WithAdminProps} from '@client/with/withAdmin';
import {Button, ClickAwayListener} from '@material-ui/core';
import * as React from 'react';
import {CommentModel} from '../model';
import {AddComment} from './AddComment';
import {DelAlert} from './DelAlert';
import {Messages} from './Messages';

interface State {
    comments: CommentModel[];
    message: string;
    openAdd: boolean;
    openAlert: boolean;
    alertID: number;
}

const data: CommentModel[] = [
    {
        id: 0,
        author: 'John',
        message: 'this is a crazy test',
        dateTime: '2018-8-4 22:2:26',
    },
    {
        id: 1,
        author: 'Jack',
        message: 'Testing text',
        dateTime: '2018-8-4 22:2:26',
    },
    {
        id: 2,
        author: 'Lucka',
        message: 'hello hello',
        dateTime: '2018-8-4 22:2:26',
    },
    {
        id: 3,
        author: 'Petra',
        message: 'how are you',
        dateTime: '2018-8-4 22:2:26',
    },
];

const initialState: State = {
    comments: data,
    message: '',
    openAdd: false,
    openAlert: false,
    alertID: 0,
};

export class CommentsIndexPage extends React.Component<WithAdminProps, State> {
    constructor(props: WithAdminProps) {
        super(props);
        this.state = initialState;
    }

    handleClick = () => {
        this.setState({
            openAdd: !this.state.openAdd,
        });
    };

    handleClickAway = () => {
        this.setState({
            openAdd: false,
        });
    };

    openAlert = (id: number) => () => {
        this.setState({
            openAlert: true,
            alertID: id,
        });
    };

    closeAlert = (id?: number) => () => {
        if (id !== undefined) {
            this.handleDel(id);
        }
        this.setState({
            openAlert: false,
        });
    };

    handleChange = (event: any): void => {
        this.setState({
            message: event.target.value,
        });
    };

    getDateTime = (): string => {
        const today: Date = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        const dateTime = date + ' ' + time;
        return dateTime;
    };

    addComment = (): void => {
        const {comments, message} = this.state;
        comments.push({
            id: comments.length ? comments[comments.length - 1].id + 1 : 0,
            author: 'anonym',
            message,
            dateTime: this.getDateTime(),
        });
        this.setState({
            comments,
            message: '',
            openAdd: false,
        });
    };

    handleDel = (i: number): void => {
        const {comments} = this.state;
        comments.splice(comments.findIndex(({id}) => id === i), 1);
        this.setState({
            comments,
        });
    };

    render() {
        return (
            <div>
                <ClickAwayListener onClickAway={this.handleClickAway}>
                    <div style={{textAlign: 'center'}}>
                        <Button style={{marginTop: '30px'}} onClick={this.handleClick} variant="raised">
                            Add comment
                        </Button>
                        {this.state.openAdd ? <AddComment message={this.state.message} handleChange={this.handleChange} addComment={this.addComment} /> : null}
                    </div>
                </ClickAwayListener>
                <Messages comments={this.state.comments} openAlert={this.openAlert} />
                <DelAlert openAlert={this.state.openAlert} closeAlert={this.closeAlert} alertID={this.state.alertID} />
            </div>
        );
    }
}
