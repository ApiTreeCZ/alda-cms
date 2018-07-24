import * as React from 'react';
import Link from 'next/link';
import {WithPublicProps} from '@client/with';

export class HomeIndexPage extends React.Component<WithPublicProps> {
    render() {
        return (
            <div>
                HomeIndexPage
                <br />
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </div>
        );
    }
}
