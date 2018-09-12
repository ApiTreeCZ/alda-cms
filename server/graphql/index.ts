import {ApolloServer, Config, gql} from 'apollo-server-express';
import {importSchema} from 'graphql-import';
import {AccountService, ExampleService, CommentService, fakeDatabase, getId, getDateTime} from '../services';
import {FindExampleQueryArgs, UpdateMeMutationArgs, AddCommentCommentMutationArgs} from '@graphql-model';

const resolvers: any = {
    Query: {
        me: () => AccountService.findLoggedUser(),
        findExample: (_: any, id: FindExampleQueryArgs) => ExampleService.findById(id),
        findAllExamples: () => ExampleService.findAll(),
        comments: () => CommentService.findAll(),
    },

    Mutation: {
        updateMe: (args: UpdateMeMutationArgs) => AccountService.save(args),
        comment: () => {
            return {
                addComment: (arg: AddCommentCommentMutationArgs) => {
                    const newUser = {...arg.input, id: '' + getId(fakeDatabase), dateTime: getDateTime()};
                    fakeDatabase.push(newUser);
                    return newUser;
                },
            };
        },
    },
};

export const createApolloServer = (config?: Pick<Config, 'resolvers' | 'typeDefs'>): ApolloServer => {
    return new ApolloServer({
        ...config,
        typeDefs: gql`
            ${importSchema('schema/root.graphql')}
        `,
        resolvers,
    });
};
