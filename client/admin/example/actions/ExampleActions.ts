import {bindActionCreators, Dispatch} from 'redux';
import {Action} from 'redux-actions';
import {ExampleTableModel} from '@client/admin/example/model';

const PREFIX = 'EXAMPLE_';

export const ExampleActionType = {
    CHANGE_COLOR: `${PREFIX}CHANGE_COLOR`,
    FETCHING_TABLE_DATA: `${PREFIX}FETCHING_TABLE_DATA`,
    FETCHED_TABLE_DATA: `${PREFIX}FETCHED_TABLE_DATA`,
    ERROR_FETCHED_TABLE_DATA: `${PREFIX}ERROR_FETCHED_TABLE_DATA`,
};

const fakeData: ExampleTableModel[] = [
    {id: 1, firstName: 'Franta', lastName: 'Novak'},
    {id: 2, firstName: 'Pepa', lastName: 'Vesely'},
    {id: 3, firstName: 'Tomas', lastName: 'Smutny'},
];

const ExampleActionDispatch = {
    changeColor: (): Action<void> => ({type: ExampleActionType.CHANGE_COLOR}),

    loadTableData: () => (dispatch: Dispatch) => {
        dispatch({type: ExampleActionType.FETCHING_TABLE_DATA});
        setTimeout(() => {
            dispatch({type: ExampleActionType.FETCHED_TABLE_DATA, payload: fakeData});
        }, 1000);
    },
};

export type ExampleAction = typeof ExampleActionDispatch;

export const ExampleActionCreator = (dispatch: Dispatch) => bindActionCreators(ExampleActionDispatch, dispatch);
