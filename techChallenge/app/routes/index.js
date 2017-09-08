const noteRoutes = require('./note_routes');
const setUpDB = require('./routerSetUpDB');
const periodSearch = require('./periodSearch');

module.exports = function (app, db) {
    noteRoutes(app, db);
    setUpDB(app, db);
    periodSearch(app, db);
    // Other route groups could go here, in the future
};