// tslint:disable-next-line
const mongoose = require('mongoose');

export const Database = {
    start: (): Promise<void> => {
        mongoose.Promise = global.Promise;
        return new Promise((resolve, reject) => {
            const {DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME} = process.env;
            if (!DATABASE_USER || !DATABASE_PASSWORD || !DATABASE_HOST || !DATABASE_PORT || !DATABASE_NAME) {
                throw new Error(
                    'Enviroment value for database connection is not set. "DATABASE_USER", "DATABASE_PASSWORD", "DATABASE_HOST", "DATABASE_PORT", "DATABASE_NAME"',
                );
            }
            mongoose.connect(`mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`);
            const conn = mongoose.connection;
            conn.once('open', () => {
                resolve();
            });
            conn.on('error', (err: any) => {
                reject(err);
            });
        });
    },
};
