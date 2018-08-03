export const initialState = {
    contacts: [
        {
            id: 1,
            firstName: 'Petr',
            lastName: 'Novak',
            email: 'pronovaso@icloud.com',
            phoneNumber: 777123456,
        },
        {
            id: 2,
            firstName: 'Karel',
            lastName: 'Omacka',
            email: 'karel@gmail.com',
            phoneNumber: 775345234,
        },
        {
            id: 3,
            firstName: 'Martina',
            lastName: 'Leva',
            email: 'martina@seznam.cz',
            phoneNumber: 603100800,
        },
    ] as ContactModel[],
    isOpen: false,
    contact: {} as ContactModel,
    id: 0,
};

export interface ContactModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number | string;
}
