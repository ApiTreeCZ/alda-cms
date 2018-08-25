import {UserModel} from '../database';
import {UpdateUserAdminMutationArgs, UserInput, UsersAdminQueryArgs} from '@graphql-model';

export const UserService = {
    create: (input: UserInput) => new UserModel(input).save(),
    update: ({id, input}: UpdateUserAdminMutationArgs) => UserModel.findByIdAndUpdate(id, input),
    findAll: ({input}: UsersAdminQueryArgs) => UserModel.find(input),
};
