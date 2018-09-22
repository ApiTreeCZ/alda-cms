import {Button, Paper, TextField, LinearProgress} from '@material-ui/core';
import React from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

const mutation = gql`
    mutation comment($input: AddCommentCommentMutationArgs!) {
        addComment(input: $input) {
            id
        }
    }
`;

interface AddCommentProps {
    message: string;
    handleChange: (event: any) => void;
    addComment: () => void;
}

// Tady do tý mutace pořád ještě nedostanu tu funkci. addComment pod tim prostě neni

const Component = (props: AddCommentProps): any => (
    <Mutation mutation={mutation}>
        {(data) => {
            return (
                <Paper style={{margin: '30px 25%'}}>
                    <form style={{padding: '20px 30px 30px 30px'}} noValidate autoComplete="off">
                        <TextField
                            name="message"
                            label="Comment here"
                            autoFocus
                            multiline
                            fullWidth
                            value={props.message}
                            onChange={props.handleChange}
                            margin="normal"
                        />
                        <Button style={{marginTop: '30px'}} onClick={props.addComment} variant="raised">
                            Post
                        </Button>
                    </form>
                </Paper>
            );
        }}
    </Mutation>
);

const withLoading = (BaseComponent: React.ComponentType<AddCommentProps>): React.ComponentClass<AddCommentProps> => {
    const initialState = {
        isLoading: false,
    };

    return class extends React.Component<AddCommentProps, typeof initialState> {
        readonly state = initialState;

        handleAddComment = () => {
            this.setState({isLoading: true});
            setTimeout(() => {
                this.props.addComment();
                this.setState({isLoading: false});
            }, 1000);
        };

        render() {
            const {addComment, ...props} = this.props;
            const {isLoading} = this.state;
            return (
                <div>
                    <BaseComponent addComment={this.handleAddComment} {...props} />
                    {isLoading && <LinearProgress />}
                </div>
            );
        }
    };
};

export const AddComment = withLoading(Component);
