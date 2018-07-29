import * as React from 'react';
import {WithAdminProps} from '@client/with/withAdmin';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
} from '../../../../node_modules/@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';

interface Post {
    id: number;
    title: string;
    timeAndDate: string;
    content: string;
}

interface State {
    posts: Post[];
    dialogOpened: boolean;
}

export class PostsIndexPage extends React.Component<WithAdminProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            posts: this.getFakeState(),
            dialogOpened: false,
        };
    }

    getFakeState = () => {
        const temp: Post[] = [
            {
                id: 1,
                title: 'Post number one',
                timeAndDate: '10:00 25.07.2018',
                content: 'This is my very first post. It should be about something, but I have absolutely no idea what about',
            },
            {
                id: 2,
                title: 'Very interesting post number two',
                timeAndDate: '15:00 28-07.2018',
                content: 'This is not interesting as well. Im completly without ideas',
            },
        ];
        return temp;
    };

    handleOnClickUpdate = () => {
        alert('Update');
    };

    handleOnClickCreatePost = () => {
        this.setState({dialogOpened: true});
    };

    handleOnClickDelete = () => {
        alert('Delete');
    };

    handleOnClose = () => {
        this.setState({dialogOpened: false});
    };

    render() {
        const posts = this.state.posts;
        const dialogOpened = this.state.dialogOpened;
        return (
            <div>
                <Button style={{margin: 30}} variant="contained" color="primary" onClick={this.handleOnClickCreatePost}>
                    Crate post
                </Button>
                {posts.map((post) => (
                    <Card style={{margin: 30}}>
                        <CardHeader title={post.title} subheader={post.timeAndDate} />
                        <CardContent>
                            <Typography component="p">{post.content}</Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton>
                                {' '}
                                <MoreVertIcon onClick={this.handleOnClickUpdate} />{' '}
                            </IconButton>
                            <IconButton>
                                {' '}
                                <DeleteIcon onClick={this.handleOnClickDelete} />{' '}
                            </IconButton>
                        </CardActions>
                    </Card>
                ))}

                <Dialog open={dialogOpened} onClose={this.handleOnClose} aria-labelledby="form-dialog-tittle">
                    <DialogTitle>Create or update post</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Please fill in all desired information</DialogContentText>
                        <TextField autoFocus margin="dense" id="title" label="Title" type="text" fullWidth />
                        <TextField margin="dense" id="content" label="Content" type="text" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.handleOnClose}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.handleOnClose}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
