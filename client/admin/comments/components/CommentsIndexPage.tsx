import {WithAdminProps} from '@client/with/withAdmin';
import {Button, ClickAwayListener, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, TextField} from '@material-ui/core';
import {RemoveCircle} from '@material-ui/icons';
import * as React from 'react';

type CommentModel = string;

interface State {
    comments: CommentModel[];
    comment: CommentModel;
    openAdd: boolean;
    openAlert: boolean;
    alertIndex: number;
}

interface MessagesProps {
    comments: CommentModel[];
    openAlert: (index: number) => () => void;
}

const Messages = (props: MessagesProps): any =>
    props.comments.map((text: any, index: number) => (
        <div style={{padding: '15px 10%'}} key={index}>
            <Paper elevation={5}>
                <div style={{padding: '20px 20px 20px 20px'}}>
                    {text}
                    <div style={{float: 'right'}}>
                        <IconButton onClick={props.openAlert(index)} aria-label="Delete">
                            <RemoveCircle />
                        </IconButton>
                    </div>
                </div>
            </Paper>
        </div>
    ));

interface AddCommentProps {
    comment: CommentModel;
    handleChange: () => void;
    addComment: () => void;
}

const AddComment = (props: AddCommentProps): any => (
    <Paper>
        <form style={{padding: '20px 30px'}} noValidate autoComplete="off">
            <TextField name="comment" label="Comment here" autoFocus multiline fullWidth value={props.comment} onChange={props.handleChange} margin="normal" />
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
    closeAlert: (index?: number) => () => void;
    alertIndex: number;
}
const DelAlert = (props: DelAlertProps): JSX.Element => (
    <Dialog open={props.openAlert} onClose={props.closeAlert()}>
        <DialogTitle>{'Are you sure you want to permanently delete this comment?'}</DialogTitle>
        <DialogContent>
            <DialogContentText>If you delete this comment, it will be permanently lost. What a shame...</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.closeAlert()}>Cancel</Button>
            <Button onClick={props.closeAlert(props.alertIndex)} autoFocus>
                Delete
            </Button>
        </DialogActions>
    </Dialog>
);

export class CommentsIndexPage extends React.Component<WithAdminProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            comments: ['this is a crazy test', 'Testing text', 'hello hello', 'how are you'],
            comment: '',
            openAdd: false,
            openAlert: false,
            alertIndex: 0,
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

    openAlert = (index: number) => () => {
        this.setState({
            openAlert: true,
            alertIndex: index,
        });
    };

    closeAlert = (index?: number) => () => {
        if (index !== undefined) {
            this.handleDel(index);
        }
        this.setState({
            openAlert: false,
        });
    };

    handleChange = (event: any): void => {
        this.setState({
            comment: event.target.value,
        });
    };

    // Couldn't get this to work couse of TS :(
    // handleChange = (name: string): any => (event: any): void => {
    //     this.setState({
    //       [name]: event.target.value     // something is wrong here
    //     });
    // }

    addComment = (): void => {
        const {comments, comment} = this.state;
        comments.unshift(comment); // add to the beginning of the array the newest
        this.setState({
            comments,
            comment: '',
            openAdd: false,
        });
    };

    handleDel = (index: number): void => {
        const {comments} = this.state;
        comments.splice(index, 1);
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
                                <AddComment comment={this.state.comment} handleChange={this.handleChange} addComment={this.addComment} />
                            </div>
                        ) : null}
                    </div>
                </ClickAwayListener>
                <Messages comments={this.state.comments} openAlert={this.openAlert} />
                <DelAlert openAlert={this.state.openAlert} closeAlert={this.closeAlert} alertIndex={this.state.alertIndex} />
            </div>
        );
    }
}
