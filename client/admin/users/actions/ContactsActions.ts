import {bindActionCreators, Dispatch} from 'redux';
import {Action} from 'redux-actions';

const PREFIX = 'USERS_MODUL_';

export const ContactsActionType = {
    DELETE_CONTACT: `${PREFIX}DELETE_CONTACT`,
    ID: `${PREFIX}ID`,
    EMPTY_CONTACT: `${PREFIX}EMPTY_CONTACT`,
    ISOPEN: `${PREFIX}ISOPEN`,
    ID_CONTACT: `${PREFIX}ID_CONTACT`,
    HANDLE_CONTACT: `${PREFIX}HANDLE_CONTACT`,
    SAVE_CONTACT: `${PREFIX}SAVE_CONTACT`,
};

const ContactsActionDispatch = {
    isOpen: (): Action<void> => ({type: ContactsActionType.ISOPEN}),
    contact: (): Action<string> => ({type: ContactsActionType.EMPTY_CONTACT, payload: ''}),
    deleteContact: (id: number): Action<number> => ({type: ContactsActionType.DELETE_CONTACT, payload: id}),
    idContact: (id: number): Action<number> => ({type: ContactsActionType.ID_CONTACT, payload: id}),
    id: (id: number): Action<number> => ({type: ContactsActionType.ID, payload: id}),
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>): Action<React.ChangeEvent<HTMLInputElement>> => ({
        type: ContactsActionType.HANDLE_CONTACT,
        payload: e,
    }),
    saveContact: (): Action<string> => ({type: ContactsActionType.SAVE_CONTACT, payload: ''}),
};

export type ContactsAction = typeof ContactsActionDispatch;

export const ContactsActionCreator = (dispatch: Dispatch) => bindActionCreators(ContactsActionDispatch, dispatch);
