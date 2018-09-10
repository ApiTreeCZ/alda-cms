import {contactsList} from './../components/model/initialState';
import {handleActions} from 'redux-actions';
import {ContactsActionType as ActionType} from '../actions';
import {ContactsStore as Store} from '../store';

const initialState = {
    contacts: contactsList,
    contact: {},
    isOpen: false,
    id: 0,
} as Store;

export const ContactsReducer = handleActions<Store, any>(
    {
        [ActionType.ISOPEN]: (state: Store): Store => ({
            ...state,
            isOpen: state.isOpen === false ? true : false,
        }),
        [ActionType.EMPTY_CONTACT]: (state: Store, {payload}): Store => ({
            ...state,
            contact: payload,
        }),
        [ActionType.DELETE_CONTACT]: (state: Store, {payload}): Store => ({
            ...state,
            contacts: [...state.contacts.filter((contact) => contact.id !== payload)],
        }),
        [ActionType.ID_CONTACT]: (state: Store, {payload}): Store => {
            const user = state.contacts.filter((contact) => contact.id === payload).find((contact) => contact.id === payload);
            if (user !== undefined) {
                return {
                    ...state,
                    contact: user,
                };
            }
            return state;
        },
        [ActionType.HANDLE_CONTACT]: (state: Store, {payload}): Store => ({
            ...state,
            contact: {...state.contact, [payload.target.name]: payload.target.value},
        }),
        [ActionType.ID]: (state: Store, {payload}): Store => ({
            ...state,
            id: payload,
        }),
        [ActionType.SAVE_CONTACT]: (state: Store, {payload}): any => {
            const userId = new Date().getMilliseconds();
            const {contact, id} = state;
            const contactsMap = state.contacts.map((user) => (user.id === id ? {...user, ...contact} : user));
            const contactFilter = contactsMap.filter((contacts) => contacts);
            if (id > 0) {
                return {
                    ...state,
                    contacts: contactFilter,
                    isOpen: false,
                    contact: payload,
                };
            }
            if (id === 0) {
                return {
                    ...state,
                    contacts: [...state.contacts, {...contact, id: userId}],
                    isOpen: false,
                    contact: payload,
                };
            }
        },
    },
    initialState,
);
