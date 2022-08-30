const config = require('../config');
const remote = require('./remote');

module.exports = new remote(config.mysqlService.host, config.mysqlService.port);