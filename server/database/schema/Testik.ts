import {Document, model, Model, Schema} from 'mongoose';

export interface TestikDocument extends Document {
    title: string;
    subtitle?: string | null;
}

export const Testik = new Schema({
    title: {
        type: String,
        required: 'You must enter title',
    },
    subtitle: {
        type: String,
    },
    roles: {
        type: [String],
    },
    complex: {
        bohunka: Number,
        pepik: Number,
        potomci: {
            tomasek: Number,
            pepik: Number,
        },
    },
});

export const TestikModel: Model<TestikDocument> = model<TestikDocument>('Testik', Testik);
