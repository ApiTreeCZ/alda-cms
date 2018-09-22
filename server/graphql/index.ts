import {ApolloServer, Config, gql} from 'apollo-server-express';
import {importSchema} from 'graphql-import';
import {AccountService, ExampleService, CommentService} from '../services';
import {FindExampleQueryArgs, UpdateMeMutationArgs} from '@graphql-model';

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
                addComment: CommentService.addComment,
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
