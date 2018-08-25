import {Document, model, Model, Schema} from 'mongoose';

export interface UserDocument extends Document {
    firstName: string;
    lastName: string;
}

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'You must enter firstName',
    },
    lastName: {
        type: String,
        required: 'You must enter lastName',
    },
});

export const UserModel: Model<UserDocument> = model<UserDocument>('User', UserSchema);
