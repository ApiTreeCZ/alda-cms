import {TestikDocument, TestikModel} from '../database';

export const TestikService = {
    findAll: async (): Promise<TestikDocument[]> => await TestikModel.find().exec(),
};
