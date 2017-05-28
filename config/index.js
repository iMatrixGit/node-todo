const config = require('./config');

module.exports = {
    getDBConnectionString() {
        return `mongodb://localhost:${config.dbPort}/${config.dbName}`
    },
    getSessionSecret: () => config.sessionSecret
};