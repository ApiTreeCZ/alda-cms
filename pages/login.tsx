import * as React from 'react';
import Link from 'next/link';
import {Typography} from '@material-ui/core';
import {Layout} from '@client/components';

export default class extends React.PureComponent {
    render() {
        return (
            <Layout>
                <Typography variant="display1">Login page</Typography>
                <Link href="/admin">
                    <a>Login</a>
                </Link>
            </Layout>
        );
    }
}
