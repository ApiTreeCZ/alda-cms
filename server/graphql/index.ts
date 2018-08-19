import {ApolloServer, Config, gql} from 'apollo-server-express';
import {importSchema} from 'graphql-import';
import {AccountService, ExampleService, TestikService} from '../services';
import {FindExampleQueryArgs, UpdateMeMutationArgs} from '@graphql-model';

const resolvers: any = {
    Query: {
        me: () => AccountService.findLoggedUser(),
        findExample: (_: any, id: FindExampleQueryArgs) => ExampleService.findById(id),
        findAllExamples: () => ExampleService.findAll(),
        testiks: () => TestikService.findAll(),
    },

    Mutation: {
        updateMe: (args: UpdateMeMutationArgs) => AccountService.save(args),
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
