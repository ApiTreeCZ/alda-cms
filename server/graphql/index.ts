import {ApolloServer, Config, gql} from 'apollo-server-express';
import {importSchema} from 'graphql-import';
import {AccountService, UserService} from '../services';
import {CreateUserAdminMutationArgs, UpdateMeMutationArgs} from '@graphql-model';

const resolvers: any = {
    Query: {
        me: () => AccountService.findLoggedUser(),

        admin: () => {
            return {
                // users: (arg: UsersAdminQueryArgs) => UserService.findAll(arg),
                users: UserService.findAll,
            };
        },
    },

    Mutation: {
        updateMe: (args: UpdateMeMutationArgs) => AccountService.save(args),
        admin: () => {
            return {
                createUser: ({input}: CreateUserAdminMutationArgs) => UserService.create(input),
                updateUser: UserService.update,
            };
        },
    },
};

export const createApolloServer = (config?: Pick<Config, 'resolvers' | 'typeDefs'>): ApolloServer => {
    return new ApolloServer({
        ...config,
        playground: {
            settings: {
                // FIXME https://github.com/prisma/graphql-playground/issues/790
                'editor.cursorShape': 'line',
            } as any,
        },
        typeDefs: gql`
            ${importSchema('schema/root.graphql')}
        `,
        resolvers,
    });
};
