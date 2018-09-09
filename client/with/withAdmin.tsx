import * as React from 'react';
import {Fragment, SyntheticEvent} from 'react';
import {DocumentProps, NextDocumentContext} from 'next/document';
import Link from 'next/link';
import Router from 'next/router';
import {ApolloClient, ApolloQueryResult} from 'apollo-boost';
import {ApolloConsumer} from 'react-apollo';
import gql from 'graphql-tag';
import cookie from 'cookie';
import {AppBar, BottomNavigation, BottomNavigationAction, IconButton, Menu, MenuItem, Toolbar, Typography} from '@material-ui/core';
import {
    AccountCircle as AccountCircleIcon,
    ArtTrack as ArtTrackIcon,
    Comment as CommentIcon,
    Dashboard as DashboardIcon,
    Menu as MenuIcon,
    PermMedia as PermMediaIcon,
    SettingsApplications as SettingsApplicationsIcon,
    SettingsInputHdmi as SettingsInputHdmiIcon,
    SupervisedUserCircle as SupervisedUserCircleIcon,
    Web as WebIcon,
} from '@material-ui/icons';
import {Account} from '@graphql-model';
import {Layout} from '@client/components';

interface LoggedInUserResponse {
    readonly loggedInUser: Pick<Account, 'id' | 'firstName' | 'lastName'>;
}

const checkLoggedIn = (apolloClient: ApolloClient<any>): Promise<Partial<LoggedInUserResponse>> => {
    return apolloClient
        .query({
            query: gql`
                query getUser {
                    me {
                        id
                        firstName
                        lastName
                    }
                }
            `,
        })
        .then(({data}: ApolloQueryResult<any>) => {
            if (!data || !data.me) {
                throw new Error('User is not logged');
            }
            return {loggedInUser: data.me};
        })
        .catch(() => {
            // Fail gracefully
            return {loggedInUser: undefined};
        });
};

const redirect = async (target: string, context?: NextDocumentContext): Promise<boolean> => {
    if (context && context.res) {
        context.res.writeHead(303, {Location: target});
        context.res.end();
        return true;
    } else {
        return await Router.replace(target);
    }
};

export interface WithAdminProps extends LoggedInUserResponse {}

export const withAdmin = (BaseComponent: React.ComponentType<WithAdminProps> & {getInitialProps?(ctx: NextDocumentContext): DocumentProps}) => {
    const initState = {
        anchorEl: undefined,
    };

    interface State {
        anchorEl?: EventTarget & HTMLElement;
    }

    return class extends React.Component<LoggedInUserResponse, Readonly<State>> {
        readonly state = initState;

        handleOnLogout = (apolloClient: ApolloClient<any>) => async () => {
            document.cookie = cookie.serialize('token', '', {
                maxAge: -1, // Expire the cookie immediately
            });
            await apolloClient.cache.reset();
            await redirect('/login');
        };

        static async getInitialProps(context: NextDocumentContext & {apolloClient: ApolloClient<any>}) {
            const {loggedInUser} = await checkLoggedIn(context.apolloClient);
            if (!loggedInUser) {
                // If not signed in, send them somewhere more useful
                await redirect('/login', context);
            }
            const props = BaseComponent.getInitialProps ? await BaseComponent.getInitialProps(context) : {};
            return {...props, loggedInUser};
        }

        handleOnClose = () => {
            this.setState({anchorEl: undefined});
        };

        handleOnClickMenu = (e: SyntheticEvent<HTMLElement>) => {
            this.setState({anchorEl: e.currentTarget});
        };

        handleOnClickRoute = (route: string) => () => {
            Router.push(route);
        };

        render() {
            const {loggedInUser} = this.props;
            const {anchorEl} = this.state;
            const isOpen = Boolean(anchorEl);
            return (
                <Layout>
                    <ApolloConsumer>
                        {(client) => (
                            <Fragment>
                                <AppBar position="static">
                                    <Toolbar>
                                        <IconButton style={{marginLeft: -12, marginRight: 20}} color="inherit" aria-label="Menu">
                                            <MenuIcon />
                                        </IconButton>
                                        <Link href="/admin">
                                            <Typography variant="title" color="inherit" style={{flexGrow: 1, cursor: 'pointer'}}>
                                                Administrace
                                            </Typography>
                                        </Link>
                                        <div>
                                            <Typography style={{display: 'inline-block'}} color="inherit">
                                                {loggedInUser.firstName} {loggedInUser.lastName}
                                            </Typography>
                                            <IconButton
                                                aria-owns={isOpen ? 'menu-appbar' : undefined}
                                                aria-haspopup="true"
                                                onClick={this.handleOnClickMenu}
                                                color="inherit"
                                            >
                                                <AccountCircleIcon />
                                            </IconButton>
                                            <Menu
                                                id="menu-appbar"
                                                anchorEl={anchorEl}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={isOpen}
                                                onClose={this.handleOnClose}
                                            >
                                                <MenuItem onClick={this.handleOnClose}>Profile</MenuItem>
                                                <MenuItem onClick={this.handleOnLogout(client)}>Logout</MenuItem>
                                            </Menu>
                                        </div>
                                    </Toolbar>
                                </AppBar>
                            </Fragment>
                        )}
                    </ApolloConsumer>

                    <main>
                        <BaseComponent {...this.props} />
                    </main>

                    <BottomNavigation showLabels style={{position: 'fixed', width: '100%', left: 0, bottom: 0}}>
                        <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} onClick={this.handleOnClickRoute('/admin/dashboard')} />
                        <BottomNavigationAction label="Users" icon={<SupervisedUserCircleIcon />} onClick={this.handleOnClickRoute('/admin/users')} />
                        <BottomNavigationAction label="Users 2" icon={<SupervisedUserCircleIcon />} onClick={this.handleOnClickRoute('/admin/users2')} />
                        <BottomNavigationAction label="Comments" icon={<CommentIcon />} onClick={this.handleOnClickRoute('/admin/comments')} />
                        <BottomNavigationAction label="Media" icon={<PermMediaIcon />} onClick={this.handleOnClickRoute('/admin/media')} />
                        <BottomNavigationAction label="Pages" icon={<WebIcon />} onClick={this.handleOnClickRoute('/admin/pages')} />
                        <BottomNavigationAction label="Posts" icon={<ArtTrackIcon />} onClick={this.handleOnClickRoute('/admin/posts')} />
                        <BottomNavigationAction label="Plugins" icon={<SettingsInputHdmiIcon />} onClick={this.handleOnClickRoute('/admin/plugins')} />
                        <BottomNavigationAction label="Settings" icon={<SettingsApplicationsIcon />} onClick={this.handleOnClickRoute('/admin/settings')} />
                        <BottomNavigationAction label="Example" icon={<SettingsApplicationsIcon />} onClick={this.handleOnClickRoute('/admin/example')} />
                    </BottomNavigation>
                </Layout>
            );
        }
    };
};
