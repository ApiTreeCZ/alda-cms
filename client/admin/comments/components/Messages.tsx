import {IconButton, Paper, Typography, withStyles, LinearProgress} from '@material-ui/core';
import {RemoveCircle} from '@material-ui/icons';
import {CommentModel} from '../model';
import {Query as ApolloQuery} from 'react-apollo';
import {Query} from '@graphql-model';
import gql from 'graphql-tag';

class CommentQuery extends ApolloQuery<Query> {}

const query = gql`
    query {
        comments {
            id
            author
            message
            dateTime
        }
    }
`;

interface MessagesProps {
    comments: CommentModel[];
    openAlert: (index: number) => () => void;
}

const styles = {
    paper: {
        backgroundColor: '#FFECB3',
        margin: '30px 10%',
        padding: '20px',
    },
};

export const Messages = withStyles(styles)<MessagesProps>((props) => {
    return (
        <CommentQuery query={query}>
            {({data, loading}) => {
                if (loading || !data || !data.comments) {
                    return <LinearProgress />;
                }
                return (
                    // props.comments
                    data.comments
                        .slice(0)
                        .reverse()
                        .map((comment: any, index: number) => (
                            <Paper className={props.classes.paper} elevation={5} key={index}>
                                {/* cssFloat in styles object doesn't work :/ */}
                                <Typography style={{float: 'right'}}>
                                    {comment.dateTime}
                                    <IconButton onClick={props.openAlert(comment.id)}>
                                        <RemoveCircle />
                                    </IconButton>
                                </Typography>
                                <Typography variant="title">{comment.author}</Typography>
                                <Typography>{comment.message}</Typography>
                            </Paper>
                        ))
                );
            }}
        </CommentQuery>
    );
});

/* 
Chtěl jsem si vyexportovat komponentu jako
export {withStyles(styles)(Messages) as Messages},
líbí se mi to mít takhle na části, chápu ale správně, že důvod proč jsme to tak nedělali, je protože tohle by nás nutilo do interface MessagesProps přidat "classes" s typama pro všechny styly? Což se překvapivě nemusí když ta komponenta jakoby neexistuje a jen se vloží rovnou jako no-name funkce do toho withStyles(styles)?

Mám celkem problém jak číst ten typ v
withStyles(styles)<MessagesProps>
Navíc to není to samé jako typ property funkce, která se použije jako property do withStyles(styles).
*/
