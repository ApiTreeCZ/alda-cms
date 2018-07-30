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
    tempPost: Post;
    updating: boolean;
}

export class PostsIndexPage extends React.Component<WithAdminProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            posts: this.getFakeState(),
            dialogOpened: false,
            tempPost: {id: -1, title: '', content: '', timeAndDate: ''},
            updating: false,
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
                timeAndDate: '15:00 28.07.2018',
                content: 'This is not interesting as well. Im completly without ideas',
            },
        ];
        return temp;
    };

    getTimeAndDateString = () => {
        const now = new Date();
        const str: string = `${now.getHours()}:${now.getMinutes()} ${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
        return str;
    };

    handleOnClickUpdate = (id: any) => () => {
        this.setState({updating: true});
        this.handleOnClickCreatePost();
        // @ts-ignore
        const foo: Post = this.state.posts.find((e) => e.id === +id);
        this.setState({tempPost: foo});
    };

    handleOnClickCreatePost = () => {
        this.setState({dialogOpened: true});
        this.setState({tempPost: {id: -1, title: '', content: '', timeAndDate: ''}});
    };

    handleOnClickDelete = (i: any) => () => {
        this.setState({posts: this.state.posts.filter((e) => e.id !== +i)});
    };

    handleOnClose = () => {
        this.setState({dialogOpened: false});
        this.setState({updating: false});
    };

    handleTitleChange = (event: any) => {
        this.setState({tempPost: {...this.state.tempPost, title: event.target.value}});
    };

    handleContentChange = (event: any) => {
        this.setState({tempPost: {...this.state.tempPost, content: event.target.value}});
    };

    handleSubmit = () => {
        if (this.state.updating) {
            const foo: Post = {
                id: this.state.tempPost.id,
                title: this.state.tempPost.title,
                content: this.state.tempPost.content,
                timeAndDate: this.getTimeAndDateString(),
            };
            this.setState({
                posts: this.state.posts.filter((e) => {
                    if (e.id !== this.state.tempPost.id) {
                        return e;
                    } else {
                        e.title = foo.title;
                        e.content = foo.content;
                        return e;
                    }
                }),
            });
        } else {
            const fooId: number = this.state.posts.length === 0 ? 0 : this.state.posts[this.state.posts.length - 1].id + 1;
            const foo: Post = {id: fooId, title: this.state.tempPost.title, content: this.state.tempPost.content, timeAndDate: this.getTimeAndDateString()};
            this.setState({
                posts: [...this.state.posts, foo],
            });
        }

        this.handleOnClose();
    };

    render() {
        const posts = this.state.posts;
        const dialogOpened = this.state.dialogOpened;
        const tempPost = this.state.tempPost;
        return (
            <div>
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
