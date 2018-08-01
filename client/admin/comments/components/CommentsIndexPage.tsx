import {WithAdminProps} from '@client/with/withAdmin';
import {Button, ClickAwayListener, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, TextField} from '@material-ui/core';
import {RemoveCircle} from '@material-ui/icons';
import * as React from 'react';

interface CommentModel {
    id: number;
    author: string;
    message: string;
}

interface State {
    comments: CommentModel[];
    message: string;
    openAdd: boolean;
    openAlert: boolean;
    alertID: number;
}

interface MessagesProps {
    comments: CommentModel[];
    openAlert: (index: number) => () => void;
}

const Messages = (props: MessagesProps): any =>
    props.comments
        .slice(0)
        .reverse()
        .map((comment: CommentModel, index: number) => (
            <div style={{padding: '15px 10%'}} key={index}>
                <Paper elevation={5}>
                    <div style={{padding: '20px 20px 20px 20px'}}>
                        <strong>{comment.author}:</strong>
                        <br />
                        {comment.message}
                        <div style={{float: 'right'}}>
                            <IconButton onClick={props.openAlert(comment.id)} aria-label="Delete">
                                <RemoveCircle />
                            </IconButton>
                        </div>
                    </div>
                </Paper>
            </div>
        ));

interface AddCommentProps {
    message: string;
    handleChange: () => void;
    addComment: () => void;
}

const AddComment = (props: AddCommentProps): any => (
    <Paper>
        <form style={{padding: '20px 30px'}} noValidate autoComplete="off">
            <TextField name="message" label="Comment here" autoFocus multiline fullWidth value={props.message} onChange={props.handleChange} margin="normal" />
            <div style={{paddingTop: '20px'}}>
                <Button onClick={props.addComment} variant="raised">
                    Post
                </Button>
            </div>
        </form>
    </Paper>
);

interface DelAlertProps {
    openAlert: boolean;
    closeAlert: (id?: number) => () => void;
    alertID: number;
}
const DelAlert = (props: DelAlertProps): JSX.Element => (
    <Dialog open={props.openAlert} onClose={props.closeAlert()}>
        <DialogTitle>{'Are you sure you want to permanently delete this comment?'}</DialogTitle>
        <DialogContent>
            <DialogContentText>If you delete this comment, it will be permanently lost. What a shame...</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.closeAlert()}>Cancel</Button>
            <Button onClick={props.closeAlert(props.alertID)} autoFocus>
                Delete
            </Button>
        </DialogActions>
    </Dialog>
);

export class CommentsIndexPage extends React.Component<WithAdminProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            comments: [
                {
                    id: 0,
                    author: 'John',
                    message: 'this is a crazy test',
                },
                {
                    id: 1,
                    author: 'Jack',
                    message: 'Testing text',
                },
                {
                    id: 2,
                    author: 'Lucka',
                    message: 'hello hello',
                },
                {
                    id: 3,
                    author: 'Petra',
                    message: 'how are you',
                },
            ],
            message: '',
            openAdd: false,
            openAlert: false,
            alertID: 0,
        };
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

    // to be fixed with ID input
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

    // Couldn't get this to work couse of TS :(
    // handleChange = (name: string): any => (event: any): void => {
    //     this.setState({
    //       [name]: event.target.value     // something is wrong here
    //     });
    // }

    addComment = (): void => {
        const {comments, message} = this.state;
        comments.push({
            id: comments.length ? comments[comments.length - 1].id + 1 : 0,
            author: 'anonym',
            message,
        });
        this.setState({
            comments,
            message: '',
            openAdd: false,
        });
    };

    handleDel = (id: number): void => {
        const {comments} = this.state;
        comments.splice(comments.findIndex((e) => e.id === id), 1);
        this.setState({
            comments,
        });
    };

    render() {
        return (
            <div>
                <ClickAwayListener onClickAway={this.handleClickAway}>
                    <div style={{textAlign: 'center', margin: '30px 25% 15px 25%'}}>
                        <Button onClick={this.handleClick} variant="raised">
                            Add comment
                        </Button>
                        {this.state.openAdd ? (
                            <div style={{marginTop: '30px'}}>
                                <AddComment message={this.state.message} handleChange={this.handleChange} addComment={this.addComment} />
                            </div>
                        ) : null}
                    </div>
                </ClickAwayListener>
                <Messages comments={this.state.comments} openAlert={this.openAlert} />
                <DelAlert openAlert={this.state.openAlert} closeAlert={this.closeAlert} alertID={this.state.alertID} />
            </div>
        );
    }
}
