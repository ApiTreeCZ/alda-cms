import * as express from 'express';
import {Database, TestikModel} from './database';
import {createApolloServer} from './graphql';

// tslint:disable-next-line
require('dotenv').config();

const server = express();

createApolloServer().applyMiddleware({app: server});

server.get('/testik', async (_, res) => {
    const model = new TestikModel({
        title: 'Pokus ' + new Date().getMilliseconds(),
        subtitle: 'Popisek',
        roles: ['ADMIN', 'USER'],
        complex: {bohunka: 3, pepik: 4, potomci: {tomasek: 8, pepik: 12}},
    });
    try {
        await model.save();
        res.sendStatus(200);
    } catch (err) {
        // tslint:disable-next-line
        console.log('error: ', err);
        res.sendStatus(500);
    }
});

server.get('/testik-query', async (_, res) => {
    const result = await TestikModel.find({title: new RegExp('Pokus', 'i')}).exec();
    res.json(result);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, async (err: Error) => {
    await Database.start();
    if (err) {
        throw err;
    }
    // tslint:disable-next-line
    console.log(`Server is ready on PORT=${PORT}`);
});
