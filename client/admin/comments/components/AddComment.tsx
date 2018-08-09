import {Button, Paper, TextField} from '@material-ui/core';

interface AddCommentProps {
    message: string;
    handleChange: () => void;
    addComment: () => void;
}

export const AddComment = (props: AddCommentProps): any => (
    <Paper style={{margin: '30px 25%'}}>
        <form style={{padding: '20px 30px 30px 30px'}} noValidate autoComplete="off">
            <TextField name="message" label="Comment here" autoFocus multiline fullWidth value={props.message} onChange={props.handleChange} margin="normal" />
            <Button style={{marginTop: '30px'}} onClick={props.addComment} variant="raised">
                Post
            </Button>
        </form>
    </Paper>
);
