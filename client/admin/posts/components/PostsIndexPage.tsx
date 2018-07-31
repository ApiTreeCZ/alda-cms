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

interface CreatePost extends Pick<Post, 'title' | 'content'> {}

interface State {
    posts: Post[];
    dialogOpened: boolean;
    currentPost: CreatePost;
    updating: boolean;
    updatingId: number;
}

export class PostsIndexPage extends React.Component<WithAdminProps, State> {
    constructor(props: WithAdminProps) {
        super(props);
        this.state = {
            posts: this.getFakeState(),
            dialogOpened: false,
            currentPost: {title: '', content: ''},
            updating: false,
            updatingId: -1,
        };
    }

    getFakeState = () => {
        const result: Post[] = [
            {
                id: 1,
                title: 'Post number one',
                timeAndDate: '10:00 25.07.2018',
                content: 'This is my very first post. It should be about something, but I have absolutely no idea what about',
            },
            {
                id: 2,
                title: 'Very interesting post number two',
                timeAndDate: '15:00 28.07.2018',
                content: 'This is not interesting as well. Im completly without ideas',
            },
        ];
        return result;
    };

    getTimeAndDateString = () => {
        const now = new Date();
        const str: string = `${now.getHours()}:${now.getMinutes()} ${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
        return str;
    };

    handleOnClickUpdate = (id: number) => () => {
        this.setState({updating: true});
        this.handleOnClickCreatePost();
        // @ts-ignore
        const foo: CreatePost = this.state.posts.find((e) => e.id === id);
        this.setState({updatingId: id});
        this.setState({currentPost: foo});
    };

    handleOnClickCreatePost = () => {
        this.setState({dialogOpened: true, currentPost: {title: '', content: ''}});
    };

    handleOnClickDelete = (id: number) => () => {
        this.setState({posts: this.state.posts.filter((e) => e.id !== id)});
    };

    handleOnClose = () => {
        this.setState({dialogOpened: false});
        this.setState({updating: false});
    };

    handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({currentPost: {...this.state.currentPost, title: event.target.value}});
    };

    handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({currentPost: {...this.state.currentPost, content: event.target.value}});
    };

    handleSubmit = () => {
        if (this.state.updating) {
            this.setState({
                posts: this.state.posts.filter((e) => {
                    if (e.id !== this.state.updatingId) {
                        return e;
                    } else {
                        e.title = this.state.currentPost.title;
                        e.content = this.state.currentPost.content;
                        return e;
                    }
                }),
            });
        } else {
            const fooId: number = this.state.posts.length === 0 ? 0 : this.state.posts[this.state.posts.length - 1].id + 1;
            const foo: Post = {
                id: fooId,
                title: this.state.currentPost.title,
                content: this.state.currentPost.content,
                timeAndDate: this.getTimeAndDateString(),
            };
            this.setState({
                posts: [...this.state.posts, foo],
            });
        }

        this.handleOnClose();
    };

    render() {
        const posts = this.state.posts;
        const dialogOpened = this.state.dialogOpened;
        const tempPost = this.state.currentPost;
        return (
            <div style={{marginBottom: 120}}>
                <Button style={{margin: 30}} variant="contained" color="primary" onClick={this.handleOnClickCreatePost}>
                    Crate post
                </Button>
                {posts.map((post) => (
                    <Card style={{margin: 30}} key={post.id}>
                        <CardHeader title={post.title} subheader={post.timeAndDate + ' id:' + post.id} />
                        <CardContent>
                            <Typography component="p">{post.content}</Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton>
                                <MoreVertIcon onClick={this.handleOnClickUpdate(post.id)} />
                            </IconButton>
                            <IconButton>
                                <DeleteIcon onClick={this.handleOnClickDelete(post.id)} />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))}

                <Dialog open={dialogOpened} onClose={this.handleOnClose} aria-labelledby="form-dialog-tittle">
                    <DialogTitle>Create or update post</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Please fill in all desired information</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            value={tempPost.title}
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            onChange={this.handleTitleChange}
                        />
                        <TextField
                            margin="dense"
                            value={tempPost.content}
                            id="content"
                            label="Content"
                            type="text"
                            fullWidth
                            onChange={this.handleContentChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.handleOnClose}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
