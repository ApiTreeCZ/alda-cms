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
} from '@material-ui/core';
import {MoreVert as MoreVertIcon, Delete as DeleteIcon} from '@material-ui/icons';

interface Post {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
}

interface CreatePost extends Partial<Pick<Post, 'title' | 'content'>> {}

interface State {
    posts: Post[];
    dialogOpened: boolean;
    currentPost: CreatePost;
    updating: boolean;
    updatingId?: number;
}

const getFakeState = () => {
    const result: Post[] = [
        {
            id: 1,
            title: 'Post number one',
            createdAt: new Date(),
            updatedAt: new Date(),
            content: 'This is my very first post. It should be about something, but I have absolutely no idea what about',
        },
        {
            id: 2,
            title: 'Very interesting post number two',
            createdAt: new Date(),
            updatedAt: new Date(),
            content: 'This is not interesting as well. Im completly without ideas',
        },
    ];
    return result;
};

export class PostsIndexPage extends React.Component<WithAdminProps, State> {
    constructor(props: WithAdminProps) {
        super(props);
        this.state = {
            posts: getFakeState(),
            dialogOpened: false,
            currentPost: {},
            updating: false,
        };
    }

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
                posts: this.state.posts.map(
                    (post) =>
                        post.id === this.state.updatingId
                            ? {
                                  ...post,
                                  title: this.state.currentPost.title === undefined ? '' : this.state.currentPost.title,
                                  content: this.state.currentPost.content === undefined ? '' : this.state.currentPost.content,
                                  updatedAt: new Date(),
                              }
                            : post,
                ),
            });
        } else {
            const fooId: number = this.state.posts.length === 0 ? 0 : this.state.posts[this.state.posts.length - 1].id + 1;
            const foo: Post = {
                id: fooId,
                title: this.state.currentPost.title === undefined ? '' : this.state.currentPost.title,
                content: this.state.currentPost.content === undefined ? '' : this.state.currentPost.content,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            this.setState({
                posts: [...this.state.posts, foo],
            });
        }

        this.handleOnClose();
    };

    printDate = (date: Date) => {
        const str: string = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${
            date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        } ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        return str;
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
                        <CardHeader title={post.title} subheader={`Created: ${this.printDate(post.createdAt)} Updated: ${this.printDate(post.updatedAt)}`} />
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
