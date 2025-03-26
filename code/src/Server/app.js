'use strict';

const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const session = require('express-session');
// const SessionStore = require('./src/helpers/sessionStore.helper');
const { errorHandler } = require('./src/middlewares/error.middleware');
const routesV1 = require('./src/routes/routes.v1');
// const {
//     rateLimiterMiddleware,
// } = require('./src/middlewares/SlidingWindow.middleware');

const app = express();

// Middleware
app.use(
    session({
        secret: global.APP_DATA.VAR.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        // store: SessionStore,
    }),
);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // Simplified log format
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

// app.use(
//     rateLimiterMiddleware(
//         global.APP_DATA.VAR.RATE_LIMITER_LIMIT,
//         global.APP_DATA.VAR.RATE_LIMITER_WINDOW_SIZE,
//     ),
// );

// require('./src/connectors/db.connector');
require('./src/helpers/logger.helper');

// Configuration
const ENV = global.APP_DATA.VAR.NODE_ENV || 'development';

//Checking the certificate verfication is needed or not
global.APP_DATA.VAR.NODE_TLS_REJECT_UNAUTHORIZED =
    ENV !== 'production' ? '0' : '1';

if (ENV !== 'development') {
    app.use(cors());
}
app.use(cors());

/* Importing the swagger-ui-express module and the swagger file. */
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./src/swagger/swagger_output.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(helmet());

app.use('/api/v1', routesV1);

app.use((req, res) => {
    res.status(global.APP_DATA.STATUS_CODES.NOT_FOUND).send();
});

app.use(errorHandler);

module.exports = app;

process.on('unhandledRejection', (reason, promise) => {
    /* eslint-disable-next-line no-console */
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', error => {
    /* eslint-disable-next-line no-console */
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
