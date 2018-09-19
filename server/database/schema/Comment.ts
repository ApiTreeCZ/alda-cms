import {Document, model, Model, Schema} from 'mongoose';

export interface CommentDocument extends Document {
    id: string;
    author: string;
    message: string;
    dateTime: string;
}

export const Comment = new Schema({
    id: String,
    author: String,
    message: String,
    dateTime: String,
});

export const CommentModel: Model<CommentDocument> = model<CommentDocument>('Comment', Comment);
