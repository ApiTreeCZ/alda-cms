import * as React from 'react';
import {Button} from '@material-ui/core';
import {Store} from '@client/Store';
import {connect} from 'react-redux';
import {ExampleAction, ExampleActionCreator} from '@client/admin/example/actions';
import {ExampleStore} from '@client/admin/example/store';

interface OwnProps {}

interface ConnectedState {
    readonly example: ExampleStore;
}

interface ConnectedDispatch extends ExampleAction {}

type Props = ConnectedState & ConnectedDispatch & OwnProps;

class Component extends React.Component<Props> {
    handleClickChangeColor = () => {
        this.props.changeColor();
    };

    handleClickRefresh = () => {
        this.props.loadTableData();
    };

    render() {
        return (
            <>
                <Button variant="raised" color="primary" onClick={this.handleClickChangeColor}>
                    Zmen barvu
                </Button>
                <Button variant="raised" color="primary" onClick={this.handleClickRefresh}>
                    Aktualizuj data
                </Button>
            </>
        );
    }
}

export const ButtonRedux = connect<ConnectedState, ConnectedDispatch, OwnProps, any>(
    ({example}: Store) => ({example}),
    ExampleActionCreator,
)(Component);
