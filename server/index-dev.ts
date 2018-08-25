import * as express from 'express';
import {Database} from './database';
import {createApolloServer} from './graphql';

// tslint:disable-next-line
require('dotenv').config();

const server = express();

createApolloServer().applyMiddleware({app: server});

const PORT = process.env.DEV_REMOTE_LOCAL_GRAPHQL_PORT || process.env.PORT || 8080;
server.listen(PORT, async (err: Error) => {
    await Database.start();
    if (err) {
        throw err;
    }
    // tslint:disable-next-line
    console.log(`Server is ready on PORT=${PORT}`);
});
