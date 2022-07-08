// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

const capitalized = require('./utils/capitalized');
const projectName = 'electric-calculator';

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require('./routes/index.routes');
app.use('/', index);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const isLoggedIn = require('./middleware/isLoggedIn');
const applianceRoutes = require('./routes/appliance.routes');
app.use('/appliance', isLoggedIn,  applianceRoutes);

const budgetRoutes = require('./routes/budget.routes');
app.use('/budget', isLoggedIn, budgetRoutes);

const priceRoutes = require('./routes/externalAPI/index');
app.use('/price', priceRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
