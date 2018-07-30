import * as React from 'react';
import {WithAdminProps} from '@client/with/withAdmin';
import {Button, Paper, ClickAwayListener, TextField} from '@material-ui/core';
import {RemoveCircle} from '@material-ui/icons';

interface State {
    comments: any[];
    comment: string;
    open: boolean;
}

const Messages = (
    props: any,
): any => // why does "props: any[]" not work here?
    props.comments.map((text: any, index: number) => (
        <div style={{padding: '15px 10%'}} key={index}>
            <Paper elevation={5}>
                <div style={{padding: '20px 20px 0px 20px'}}>{text}</div>
                <div style={{textAlign: 'right'}}>
                    <RemoveCircle onClick={props.dellComment(index)} />
                </div>
            </Paper>
        </div>
    ));

const AddComment = (props: any): any => (
    <Paper>
        <form style={{padding: '20px 30px'}} noValidate autoComplete="off">
            <TextField name="comment" multiline fullWidth value={props.comment} onChange={props.handleChange} margin="normal" />
            <div style={{paddingTop: '20px'}}>
                <Button onClick={props.addComment} variant="raised">
                    Post
                </Button>
            </div>
        </form>
    </Paper>
);

export class CommentsIndexPage extends React.Component<WithAdminProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            comments: ['this is a crazy test', 'Testing text', 'hello hello', 'how are you'],
            comment: '',
            open: false,
        };
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    handleClickAway = () => {
        this.setState({
            open: false,
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
    //       [name]: event.target.value
    //     });
    // }

    addComment = (): void => {
        const {comments, comment} = this.state;
        comments.unshift(comment); // add to the beginning of the array the newest
        this.setState({
            comments,
            comment: '',
            open: false,
        });
    };

    dellComment = (index: number) => (): void => {
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
                        {this.state.open ? (
                            <div style={{marginTop: '30px'}}>
                                <AddComment comment={this.state.comment} handleChange={this.handleChange} addComment={this.addComment} />
                            </div>
                        ) : null}
                    </div>
                </ClickAwayListener>
                <Messages comments={this.state.comments} dellComment={this.dellComment} />
            </div>
        );
    }
}
