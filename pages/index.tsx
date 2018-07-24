import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import {Typography} from '@material-ui/core';
import {Lang} from '@lang';
import {Layout} from '@client/components';

export default class extends React.Component {
    render() {
        return (
            <Layout>
                <Typography>
                    <FormattedMessage id={Lang.TITLE} />
                </Typography>
            </Layout>
        );
    }
}
