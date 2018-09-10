import {Comment} from '@graphql-model';

const fakeDatabase: Comment[] = [
    {
        id: '0',
        author: 'John',
        message: 'this is a crazy test',
        dateTime: '2018-8-4 22:2:26',
    },
    {
        id: '1',
        author: 'Jack',
        message: 'Testing text',
        dateTime: '2018-8-4 22:2:26',
    },
    {
        id: '2',
        author: 'Lucka',
        message: 'hello hello',
        dateTime: '2018-8-4 22:2:26',
    },
    {
        id: '3',
        author: 'Petra',
        message: 'how are you',
        dateTime: '2018-8-4 22:2:26',
    },
];

export const CommentService = {
    findAll: (): Comment[] => fakeDatabase,
};
