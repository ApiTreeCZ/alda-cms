import {Action, handleActions} from 'redux-actions';
import {ExampleActionType as ActionType} from '../actions';
import {ExampleStore as Store} from '../store';
import {ExampleTableModel} from '@client/admin/example/model';

const initialState = {
    tableBackgroundColor: 'blue',
    table: {
        isFetching: false,
        isFetched: false,
        data: undefined,
        error: undefined,
    },
} as Store;

export const ExampleReducer = handleActions<Store, any>(
    {
        [ActionType.CHANGE_COLOR]: (state: Store): Store => ({
            ...state,
            tableBackgroundColor: state.tableBackgroundColor === 'blue' ? 'green' : 'blue',
        }),
        [ActionType.FETCHING_TABLE_DATA]: (state: Store): Store => ({
            ...state,
            table: {...state.table, isFetching: true, isFetched: false, error: undefined},
        }),
        [ActionType.FETCHED_TABLE_DATA]: (state: Store, {payload}: Action<ExampleTableModel[]>): Store => ({
            ...state,
            table: {...state.table, isFetching: false, isFetched: true, error: undefined, data: payload},
        }),
    },
    initialState,
);
