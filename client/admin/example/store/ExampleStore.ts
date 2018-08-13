import {ExampleTableModel} from '@client/admin/example/model';

export interface ExampleStore {
    tableBackgroundColor: string;
    table: {
        isFetching: boolean;
        data?: ExampleTableModel[];
        isFetched: boolean;
        error?: string;
    };
}
