import {Comment, AddCommentCommentMutationArgs} from '@graphql-model';
import {CommentModel, CommentDocument} from '../database';

export const fakeDatabase: Comment[] = [
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

export const getId = (array: CommentDocument[]): number => {
    return array.length ? +array[array.length - 1].id + 1 : 0;
};

export const getDateTime = (): string => {
    const fixZero = (s: any): string => {
        s += '';
        return s.length < 2 ? '0' + s : s;
    };
    const today: Date = new Date();
    const date = today.getFullYear() + '-' + fixZero(today.getMonth() + 1) + '-' + fixZero(today.getDate());
    const time = today.getHours() + ':' + fixZero(today.getMinutes()) + ':' + fixZero(today.getSeconds());
    const dateTime = date + ' ' + time;
    return dateTime;
};

export const CommentService = {
    // for the fake DB:
    // findAll: (): Comment[] => fakeDatabase,

    // for the real DB:
    findAll: async (): Promise<CommentDocument[]> => await CommentModel.find({}),

    addComment: async ({input}: AddCommentCommentMutationArgs): Promise<CommentDocument> => {
        // const newUser = {...arg.input, id: '' + getId(fakeDatabase), dateTime: getDateTime()};
        const arr = await CommentService.findAll();
        const comment = new CommentModel({...input, id: '' + getId(arr), dateTime: getDateTime()});
        await comment.save();
        return comment;
    },
};
