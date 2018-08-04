import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

interface DelAlertProps {
    openAlert: boolean;
    closeAlert: (id?: number) => () => void;
    alertID: number;
}

export const DelAlert = (props: DelAlertProps): JSX.Element => (
    <Dialog open={props.openAlert} onClose={props.closeAlert()}>
        <DialogTitle>{'Are you sure you want to permanently delete this comment?'}</DialogTitle>
        <DialogContent>
            <DialogContentText>If you delete this comment, it will be permanently lost. What a shame...</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.closeAlert()}>Cancel</Button>
            <Button onClick={props.closeAlert(props.alertID)} autoFocus>
                Delete
            </Button>
        </DialogActions>
    </Dialog>
);
