import {Example, FindExampleQueryArgs} from '@graphql-model';

const fakeDatabase: Example[] = [
    {
        id: '1',
        firstName: 'Franta',
        lastName: 'Vomacka',
        role: 'Admin',
    },
    {
        id: '2',
        firstName: 'Pepik',
        lastName: 'Novak',
        role: 'User',
    },
    {
        id: '3',
        firstName: 'Martin',
        lastName: 'Novotny',
        role: 'Supervisor',
    },
];

export const ExampleService = {
    findById: ({id}: FindExampleQueryArgs): Example | undefined => fakeDatabase.find((f) => f.id === id),

    findAll: (): Promise<Example[]> =>
        new Promise<Example[]>((resolve) => {
            setTimeout(() => {
                resolve(fakeDatabase);
            }, 1000);
        }),
};
