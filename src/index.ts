import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import { consoleLogger } from './middleware/console-logger';
import { baseRoute } from './routes/base';
import { accountRoute } from './routes/account';
import { sessionRoute } from './routes/session';
import { errorHandler } from './middleware/error-handler';

const sessionOptions = {
    store: new (require('connect-pg-simple')(session))({
        // Insert connect-pg-simple options here
    }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
}

const start = () => {
    const app = express();
    app.use(session(sessionOptions));
    app.use(consoleLogger);

    // parse application/x-www-form-urlencoded
    // app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    // app.use(bodyParser.json());

    app.use('/', baseRoute);
    app.use('/account', accountRoute);
    app.use('/session', sessionRoute);

    // errorHandler last
    app.use(errorHandler);

    app.listen(3000);
    console.log('Server Started on port:', 3000);
}

start();
