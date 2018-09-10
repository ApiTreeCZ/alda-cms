import {ContactModel} from '@client/admin/users/components/model';

export interface ContactsStore {
    contacts: ContactModel[];
    contact: ContactModel;
    isOpen: boolean;
    id: number;
}
