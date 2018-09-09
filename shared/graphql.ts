/* tslint:disable */
import {GraphQLResolveInfo} from 'graphql';

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
    parent: Parent,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo,
) => Promise<Result> | Result;

export type SubscriptionResolver<Result, Parent = any, Context = any, Args = any> = {
    subscribe<R = Result, P = Parent>(parent: P, args: Args, context: Context, info: GraphQLResolveInfo): AsyncIterator<R | Result>;
    resolve?<R = Result, P = Parent>(parent: P, args: Args, context: Context, info: GraphQLResolveInfo): R | Result | Promise<R | Result>;
};

export interface Query {
    me?: Account | null;
    example: Example;
    examples?: Example[] | null;
    admin: AdminQuery;
}

export interface Account {
    id: string;
    firstName: string;
    lastName: string;
}

export interface Example {
    id: string;
    firstName: string;
    lastName: string;
}

export interface AdminQuery {
    users: User[];
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
}

export interface Mutation {
    updateMe?: Account | null;
    admin: AdminMutation;
}

export interface AdminMutation {
    createUser: User;
    updateUser: User;
}

export interface UserQueryInput {
    firstName?: string | null;
}

export interface MeUpdateInput {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
}

export interface UserInput {
    firstName: string;
    lastName: string;
}
export interface ExampleQueryArgs {
    id: string;
}
export interface UsersAdminQueryArgs {
    input?: UserQueryInput | null;
}
export interface UpdateMeMutationArgs {
    input?: MeUpdateInput | null;
}
export interface CreateUserAdminMutationArgs {
    input: UserInput;
}
export interface UpdateUserAdminMutationArgs {
    id: string;
    input: UserInput;
}

export interface QueryResolvers<Context = any> {
    me?: QueryMeResolver<Account | null, any, Context>;
    example?: QueryExampleResolver<Example, any, Context>;
    examples?: QueryExamplesResolver<Example[] | null, any, Context>;
    admin?: QueryAdminResolver<AdminQuery, any, Context>;
}

export type QueryMeResolver<R = Account | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type QueryExampleResolver<R = Example, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface QueryExampleArgs {
    id: string;
}

export type QueryExamplesResolver<R = Example[] | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type QueryAdminResolver<R = AdminQuery, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface AccountResolvers<Context = any> {
    id?: AccountIdResolver<string, any, Context>;
    firstName?: AccountFirstNameResolver<string, any, Context>;
    lastName?: AccountLastNameResolver<string, any, Context>;
}

export type AccountIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AccountFirstNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AccountLastNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface ExampleResolvers<Context = any> {
    id?: ExampleIdResolver<string, any, Context>;
    firstName?: ExampleFirstNameResolver<string, any, Context>;
    lastName?: ExampleLastNameResolver<string, any, Context>;
}

export type ExampleIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type ExampleFirstNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type ExampleLastNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface AdminQueryResolvers<Context = any> {
    users?: AdminQueryUsersResolver<User[], any, Context>;
}

export type AdminQueryUsersResolver<R = User[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminQueryUsersArgs {
    input?: UserQueryInput | null;
}

export interface UserResolvers<Context = any> {
    id?: UserIdResolver<string, any, Context>;
    firstName?: UserFirstNameResolver<string, any, Context>;
    lastName?: UserLastNameResolver<string, any, Context>;
}

export type UserIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type UserFirstNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type UserLastNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface MutationResolvers<Context = any> {
    updateMe?: MutationUpdateMeResolver<Account | null, any, Context>;
    admin?: MutationAdminResolver<AdminMutation, any, Context>;
}

export type MutationUpdateMeResolver<R = Account | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface MutationUpdateMeArgs {
    input?: MeUpdateInput | null;
}

export type MutationAdminResolver<R = AdminMutation, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface AdminMutationResolvers<Context = any> {
    createUser?: AdminMutationCreateUserResolver<User, any, Context>;
    updateUser?: AdminMutationUpdateUserResolver<User, any, Context>;
}

export type AdminMutationCreateUserResolver<R = User, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationCreateUserArgs {
    input: UserInput;
}

export type AdminMutationUpdateUserResolver<R = User, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationUpdateUserArgs {
    id: string;
    input: UserInput;
}
