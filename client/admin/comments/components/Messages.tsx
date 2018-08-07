import {IconButton, Paper, Typography} from '@material-ui/core';
import {RemoveCircle} from '@material-ui/icons';
import {CommentModel} from '../model';

interface MessagesProps {
    comments: CommentModel[];
    openAlert: (index: number) => () => void;
}

export const Messages = (props: MessagesProps): any => {
    return props.comments
        .slice(0)
        .reverse()
        .map((comment: CommentModel, index: number) => (
            <div style={{padding: '15px 10%'}} key={index}>
                <Paper elevation={5}>
                    <div style={{padding: '20px 20px 20px 20px'}}>
                        <div style={{float: 'right'}}>
                            <Typography>
                                {comment.dateTime}
                                <IconButton onClick={props.openAlert(comment.id)}>
                                    <RemoveCircle />
                                </IconButton>
                            </Typography>
                        </div>
                        <Typography variant="title">{comment.author}</Typography>
                        <Typography>{comment.message}</Typography>
                    </div>
                </Paper>
            </div>
        ));
};
