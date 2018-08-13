import {combineReducers} from 'redux';
import {Store} from '@client/Store';
import {ExampleReducer} from '@client/admin/example/reducers';

type Reducers = {[P in keyof Store]: any};

export const rootReducer = combineReducers<Reducers>({
    example: ExampleReducer,
});
