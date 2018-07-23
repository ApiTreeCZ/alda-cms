import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import {Typography} from '@material-ui/core';
import {Lang} from '../client/Lang';

export default class extends React.Component {
    render() {
        return (
            <div>
                <Typography>
                    <FormattedMessage id={Lang.TITLE} />
                </Typography>
            </div>
        );
    }
}
