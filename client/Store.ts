import {ContactsStore} from '@client/admin/users/store/ContactsStore';
import {ExampleStore} from '@client/admin/example/store';

export interface Store {
    example: ExampleStore;
    contacts: ContactsStore;
}
